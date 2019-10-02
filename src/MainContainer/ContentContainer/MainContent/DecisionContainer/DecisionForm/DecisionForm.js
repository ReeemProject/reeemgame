import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../../../../../Context/Context'
import { InfoOutlined } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'
import { Decisions } from './Decisions'
import {
  DecisionHeader,
  IntroText,
  StyledButton,
  StyledRadio,
  StyledFormControlLabel,
  StyledFormLabel,
  StyledGrid,
  Icon,
  HorizontalContainer,
} from './DecisionForm.style'

export const DecisionForm = ({ onStart }) => {
  const [choices, setChoice] = useState({})
  const [scenario, setScenario] = useState({ c: 0, e: 0, t: 0 })
  const [newScenario, setNewScenario] = useState({ c: 0, e: 0, t: 0 })
  const [state, dispatch] = useContext(Context)
  const [CCSAllowed, allowCCS] = useState(false)
  const currentDecisions = Decisions().filter(
    decision => decision.year === state.currentDecision
  )[0]

  const handleSubmit = e => {
    e.preventDefault()
    dispatch({
      type: 'forwardToNextDecision',
    })
    if (state.gameState === 'over') {
      //Reset weights when clicking "try again"
      dispatch({
        type: 'setWeights',
        weights: {},
      })
      allowCCS(false) //reset allow CCS
    }
    if (state.gameState === 'start') {
      if (!(state.weights.eco && state.weights.soc && state.weights.env)) {
        dispatch({
          type: 'resetWeights',
          toggle: true,
        })
      }
      onStart()
      //Set indicator to emission limit when the game starts, if no indicator has been selected
      if (!state.selectedIndicator) {
        dispatch({
          name: 'coal',
          type: 'setSelectedIndicator',
        })
      }
      setNewScenario({ c: 0, e: 0, t: 0 })
      setScenario({ c: 0, e: 0, t: 0 })
      dispatch({
        type: 'setSelectedScenario',
        name: 'C0T0E0',
      })
    } else {
      let nextScenario = {}
      nextScenario.c = newScenario.c + scenario.c
      nextScenario.t = newScenario.t + scenario.t
      nextScenario.e = newScenario.e + scenario.e

      setScenario(nextScenario)
      setNewScenario({ c: 0, e: 0, t: 0 })
      dispatch({
        type: 'setSelectedScenario',
        name:
          'C' + nextScenario.c + 'T' + nextScenario.t + 'E' + nextScenario.e,
      })

      //set state to indicate that CCS has been allowed (question needs to be removed)
      if (
        choices['ccs1'] === 'y' ||
        choices['ccs2'] === 'y' ||
        choices['ccs3'] === 'y'
      ) {
        allowCCS(true)
      }
    }
    setChoice({})
  }
  const getNewScenario = add => {
    if (add.C || add.C === 0) newScenario.c = add.C
    else if (add.E || add.E === 0) newScenario.e = add.E
    else if (add.T || add.T === 0) newScenario.t = add.T
    else alert('add: ' + JSON.stringify(add))
    return newScenario
  }
  //If CCS has been allowed once it cannot be banned again (hence question is filtered out)
  const decisions = currentDecisions.individualDecisions
    ? currentDecisions.individualDecisions.filter(decision =>
        CCSAllowed ? decision.name !== 'ccs2' && decision.name !== 'ccs3' : true
      )
    : []
  return (
    <StyledGrid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      <DecisionHeader>{currentDecisions.header}</DecisionHeader>
      <IntroText>{currentDecisions.introText}</IntroText>
      <form onSubmit={e => handleSubmit(e)}>
        {decisions.map((decision, i) => (
          <React.Fragment key={'decision' + i}>
            <HorizontalContainer>
              <StyledFormLabel component="legend">
                {decision.introText}
              </StyledFormLabel>
              {decision.info && (
                <Tooltip
                  title={decision.info}
                  placement="right-start"
                  interactive
                >
                  <Icon>
                    <InfoOutlined />
                  </Icon>
                </Tooltip>
              )}
            </HorizontalContainer>
            {decision.options.map((option, j) => (
              <StyledFormControlLabel
                key={'option' + j}
                value={option.value}
                control={<StyledRadio />}
                label={option.text}
                id={option.value}
                checked={choices[decision.name] === option.value}
                onClick={() => {
                  setChoice({
                    ...choices,
                    [decision.name]: option.value,
                  })
                  setNewScenario(getNewScenario(option.scenario))
                }}
              />
            ))}
          </React.Fragment>
        ))}
        <StyledGrid item>
          <StyledButton
            type="submit"
            disabled={
              decisions.individualDecisions !== undefined &&
              !decisions.individualDecisions.every(
                decision => choices[decision.name] !== undefined
              )
            }
          >
            {currentDecisions.submitText}
          </StyledButton>
        </StyledGrid>
      </form>
    </StyledGrid>
  )
}

DecisionForm.propTypes = {
  onStart: PropTypes.func.isRequired,
}
