import React from 'react'
// import { Col, Row } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}))

const glossary = [
  {
    header: 'Git директория',
    description: 'Git директория (.git directory) - это то место где Git хранит все данные контроля версий этого проекта, всю историю разработки.'
  },
  {
    header: 'Рабочая директория',
    description: 'Рабочая директория (working directory) или папка содержит те файлы проекта, с которыми вы работаете на данный момент. В зависимости от того, с какой веткой вы работаете, из Git директории распаковываются соответствующие файлы и располагаются в вашей локальной рабочей папке, чтобы вы могли с ними работать.'
  },
  {
    header: 'Индекс',
    description: 'Индекс - это область подготовленных файлов (staging area). Список файлов и директорий, которые отслеживаются Git-ом. Это промежуточное хранилище изменений, область подготовленных файлов, которые впоследствии будут добавлены в коммит.'
  },
  {
    header: 'Коммит',
    description: 'Это фиксация изменений или запись изменений, сделанных в рабочей директории с момента предыдущего коммита. То есть, у всех коммитов (кроме самого первого) есть родительские коммиты, т.к. они хранят изменения от предыдущих состояний. Коммит происходит на локальной машине, коммит неизменен, его нельзя отредактировать. Когда вы делаете коммит, используются файлы из индекса и сохраняются в вашу Git директорию.'
  },
  {
    header: 'Репозиторий',
    description: 'Это по сути хранилище, где хранятся файлы и папки. Локальный репозиторий расположен на локальном компьютере разработчика и именно в нём происходит разработка и фиксация изменений, которые впоследствии отправляются на удалённый репозиторий. Удалённый репозиторий находится на удалённом сервере, в него добавляются изменения всех программистов, работающих над проектом.'
  },
]

const gitSteps = [
  {
    header: 'Создание репозитория',
    description: 'С помощью набора команд git init создаём локальный репозиторий (хранилище). Это скрытая папка (.git) со стартовым набором рабочих файлов и папок. В ней будут храниться все данные контроля версий вашего проекта, вся история разработки. Эта скрытая папка должна быть в вашей локальной рабочей директории (папке), где вы и будете работать над вашим проектом. Эта операция выполняется однократно.'
  },
  {
    header: 'Работа с файлами',
    description: 'В вашей локальной рабочей директории вы трудитесь над вашим проектом: редактируете, добавляете, удаляете файлы. В какой-то момент вы понимаете, что нужно сохранить текущее состояние вашего проекта. Посмотрите, в каком состоянии находятся ваши файлы с помощью команды git status. Далее нужно правильно выполнить определённые действия.'
  },
  {
    header: 'Индексирование',
    description: 'На этом этапе нужно выполнить индексацию (добавление) файлов в индекс (область подготовленных файлов). Необходимо дать указание для git, какие изменения нужно будет закоммитить (зафиксировать). Выполните  подходящую вам команду из набора git add.'
  },
  {
    header: 'Коммит',
    description: 'Фиксация изменений называется коммитом. Все проиндексированные изменения записываются в репозиторий. Обратите внимание, что коммит происходит в вашем локальном проекте. Выполните  подходящую вам команду из набора git commit. Существуют комбинированные команды для одновременного индексирования отслеживаемых файлов и выполнения коммита. Таким способом предыдущий и текущий шаги можно выполнить за одну команду. Нюансы читайте в описании команд.'
  },
  {
    header: 'Отправка на удалённый репозиторий',
    description: 'Теперь нужно отправить все изменения, сделанные локально на вашем компьютере в удалённый репозиторий. Однократно нужно создать удалённый репозиторий, например, на GitHub. Также однократно с помощью команды git remote add связываем удалённый репозиторий с вашим локальным. Ну, а теперь все неотправленные ранее коммиты отправляем на удалённый репозиторий с помощью группы команд git push. Теперь возвращаемся к шагу 2 и повторяем весь цикл заново.'
  },
]

function getSteps() {
  let headerArr = gitSteps.map((item) => {
    return item.header
  })
  return headerArr
}

function getStepContent(step) {
  return gitSteps[step].description
}


export const GitPage = () => {

  const classes = useStyles()

  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const data = glossary.map((info, index) => {
    return (
      <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{info.header}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {info.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Что такое Git?</h1>
      </Grid>
      <Grid item xs={12}>
        <p>Git - это система контроля версий для программного продукта. Несколько программистов могут работать над одним проектом. Каждый локально выполняет свою задачу, а затем может поделиться своим кодом через эту систему или скачать себе чужой код. В том числе можно выполнить слияние кода, если работа велась над одной и той же частью программы. Создавая периодически точки сохранения, можно в любой момент вернуться к другой версии вашей программы. Хранилищем вашего проекта является репозиторий.</p>
        <p>Для управления Git-репозиториями существуют различные платформы. Например, те, которые у большинства на слуху - это GitHub и GitLab.</p>
        <h2>Основные термины</h2>
      </Grid>
      <div className={classes.root}>
        {data}
      </div>
      <Grid item xs={12}>
        <h2>Базовые шаги работы с Git</h2>
      </Grid>

      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Назад
                  </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Конец' : 'Вперёд'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Все шаги завершены.</Typography>
            <Button
              variant="contained"
              onClick={handleReset}
              className={classes.button}
            >
              Возврат к началу
          </Button>
          </Paper>
        )}
      </div>

    </Grid>
  )
}



// export const GitPage = () => {
//   return (
//     <div>
//       <h1>Что такое Git?</h1>
//       <p>Git - это система контроля версий для программного продукта. Несколько программистов могут работать над одним проектом. Каждый локально выполняет свою задачу, а затем может поделиться своим кодом через эту систему или скачать себе чужой код. В том числе можно выполнить слияние кода, если работа велась над одной и той же частью программы. Создавая периодически точки сохранения, можно в любой момент вернуться к другой версии вашей программы. Хранилищем вашего проекта является репозиторий.</p>
//       <p>Для управления Git-репозиториями существуют различные платформы. Например, те, которые на слуху у большинства - это GitHub и GitLab.</p>
//       <h2>Основные термины</h2>
//     </div>
//   )
// }

