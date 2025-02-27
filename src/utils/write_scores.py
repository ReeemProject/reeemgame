import json
from os import environ
import pandas as pd
from typing import Dict, Optional

# for development
# kpis = {}
# kpis['CO2Intensity'] = pd.read_csv('results/220617/results/CO2Intensity_10th.csv')
# kpis['DiscountedInvestmentPerCitizen'] = pd.read_csv('results/220617/results/DiscountedInvestmentPerCitizen_10th.csv')
# kpis['LCOE'] = pd.read_csv('results/220617/results/LCOE_10th.csv')

def normalise_scores(df: pd.DataFrame) -> pd.DataFrame:

    df = df.set_index('REGION')

    max_value = max(df.max())
    min_value = min(df.min())
    kpi_range = max_value-min_value
        
    df = 100 - ((df-min_value)/kpi_range)*100

    return df

def main(kpis: Dict, path: str, reg: Optional[str]=None):

    for kpi in kpis:
        
        kpis[kpi] = normalise_scores(kpis[kpi])

    rawScores = []

    scenarios = list(kpis['AccumulatedCO2'])

    if reg:
        for s in scenarios:
            env = kpis['AccumulatedCO2'].loc[reg, s]
            eco = kpis['DiscountedInvestmentPerCitizen'].loc[reg, s]
            soc = kpis['LCOE'].loc[reg, s]
            rawScores.append(
                {
                    "scenario": s,
                    "env": env,
                    "eco": eco,
                    "soc": soc
                }
            )
    else:
        countries = kpis['AccumulatedCO2'].index
        for c in countries:
            for s in scenarios:
                env = kpis['AccumulatedCO2'].loc[c, s]
                eco = kpis['DiscountedInvestmentPerCitizen'].loc[c, s]
                soc = kpis['LCOE'].loc[c, s]
                rawScores.append(
                    {
                        "scenario": s,
                        "country": c,
                        "env": env,
                        "eco": eco,
                        "soc": soc
                    }
                )

    with open(path, 'w') as outfile:
        json.dump(rawScores, outfile)

    return