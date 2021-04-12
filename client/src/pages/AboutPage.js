import Typography from '@material-ui/core/Typography'

export const AboutPage = () => {
  return (
    <>
      <Typography variant="h1" component="h1">О проекте Git Guide</Typography>
      <Typography variant="body1" component="p">Основная идея этого Путеводителя по Git - помочь быстро сформировать необходимую команду Git, скопировать в буфер обмена и вставить в командную строку. Это очень удобно для начинающих программистов, пока команды ещё не запомнились. В таких случаях шпаргалка - это очень удобный инструмент.</Typography>
      <Typography variant="body1" component="p">Я делаю проект по технологии MERN. Фронтенд и бэкенд на данный момент размещены на бесплатном хостинге от Heroku. База данных лежит на <a href="https://www.mongodb.com/">mongodb.com</a>. У меня нет конкретной даты завершения проекта. По мере появления идей буду оптимизировать, расширять и дорабатывать Путеводитель.</Typography>
    </>
  )
}