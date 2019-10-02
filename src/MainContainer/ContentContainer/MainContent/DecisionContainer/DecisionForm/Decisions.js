import { useTranslation } from 'react-i18next'

export const Decisions = () => {
  const { t } = useTranslation()
  return [
    {
      year: '2019',
      header: t('decisions.2019.header'),
      introText: t('decisions.2019.intro'),
      submitText: t('decisions.start'),
    },
    {
      year: '2020',
      header: t('decisions.2020.header'),
      introText: t('decisions.2020.intro'),
      individualDecisions: [
        {
          name: 'ccs1',
          introText: t('decisions.ccs'),
          info: t('decisions.info.ccs'),
          options: [
            {
              value: 'y',
              text: t('general.yes'),
              scenario: { C: 0 },
            },
            {
              value: 'n',
              text: t('general.no'),
              scenario: { C: 0 },
            },
          ],
        },
        {
          name: 'emissions1',
          introText: t('decisions.emissions'),
          info: t('decisions.info.emissions'),
          options: [
            {
              value: 'ets',
              text: t('decisions.options.etsPace'),
              scenario: { E: 0 },
            },
            {
              value: 'faster',
              text: t('decisions.options.fasterPace'),
              scenario: { E: 0 },
            },
          ],
        },
      ],
      submitText: t('decisions.submitChoices'),
    },
    {
      year: '2030',
      header: t('decisions.2030.header'),
      introText: t('decisions.2030.intro'),
      individualDecisions: [
        {
          name: 'ccs2',
          introText: t('decisions.ccs'),
          info: t('decisions.info.ccs'),
          options: [
            {
              value: 'y',
              text: t('general.yes'),
              scenario: { C: 0 },
            },
            {
              value: 'n',
              text: t('general.no'),
              scenario: { C: 0 },
            },
          ],
        },
        {
          name: 'emissions2',
          introText: t('decisions.emissions'),
          info: t('decisions.info.emissions'),
          options: [
            {
              value: 'ets',
              text: t('decisions.options.etsPace'),
              scenario: { E: 0 },
            },
            {
              value: 'faster',
              text: t('decisions.options.fasterPace'),
              scenario: { E: 0 },
            },
          ],
        },
        {
          name: 'biomass',
          introText: t('decisions.biomass'),
          options: [
            {
              value: 'y',
              text: t('general.yes'),
              scenario: { T: 0 },
            },
            {
              value: 'n',
              text: t('general.no'),
              scenario: { T: 0 },
            },
          ],
        },
        {
          name: 'crossBorder',
          introText: t('decisions.crossBorder'),
          info: t('decisions.info.crossBorder'),
          options: [
            {
              value: 'y',
              text: t('general.yes'),
              scenario: { C: 0 },
            },
            {
              value: 'n',
              text: t('general.no'),
              scenario: { C: 0 },
            },
          ],
        },
      ],
      submitText: t('decisions.submitChoices'),
    },
    {
      year: '2040',
      header: t('decisions.2040.header'),
      introText: t('decisions.2040.intro'),
      individualDecisions: [
        {
          name: 'ccs3',
          introText: t('decisions.ccs'),
          info: t('decisions.info.ccs'),
          options: [
            {
              value: 'y',
              text: t('general.yes'),
              scenario: { C: 0 },
            },
            {
              value: 'n',
              text: t('general.no'),
              scenario: { C: 0 },
            },
          ],
        },
        {
          name: 'emissions3',
          introText: t('decisions.emissions'),
          info: t('decisions.info.emissions'),
          options: [
            {
              value: 'ets',
              text: t('decisions.options.etsPace'),
              scenario: { E: 0 },
            },
            {
              value: 'faster',
              text: t('decisions.options.fasterPace'),
              scenario: { E: 0 },
            },
          ],
        },
      ],
      submitText: t('decisions.submitChoice'),
    },
    {
      year: '2050',
      header: t('decisions.2050.header'),
      introText: t('decisions.2050.intro'),
      submitText: t('decisions.tryAgain'),
    },
  ]
}
