import BackgroundPregnant from '@/assets/backgroundHome/background_gestante.png'
import BackgroundBreastfeeding from '@/assets/backgroundHome/background_lactante.png'
import BackgroundResponsible from '@/assets/backgroundHome/background_responsible.png'
import BackgroundGetPregnant from '@/assets/backgroundHome/background_tentante.png'
import CalendarBreastFeeding from '@/assets/calendar/calendar_breastfeeding.png'
import CalendarGetPregnant from '@/assets/calendar/calendar_get_pregnant.png'
import CalendarPregnant from '@/assets/calendar/calendar_pregnant.png'
import FeaturedImageBreastfeeding from '@/assets/homeDestaque/breastfeeding.png'
import FeaturedImageGePregnant from '@/assets/homeDestaque/getPregnant.png'
import FeaturedImagePregnant from '@/assets/homeDestaque/pregnant.png'
import FeaturedImageResponsible from '@/assets/homeDestaque/responsable.png'
import LogoPregnant from '@/assets/logos/Logo-1.svg'
import LogoTentante from '@/assets/logos/Logo-4.svg'
import theme from '@/global/styles/theme'
import {IPodcast} from '@/types/entities/Podcast/PodcastEntity.types'
import {ESituation, TSituation} from '@/types/entities/User/UserEntity.types'

interface IDescriptionHome {
  image: string
  title: string
  title2: string
  subTitle: string
  text: string
}

export const descriptionSituation: Record<TSituation, IDescriptionHome> = {
  getPregnant: {
    image: 'LogoSvg1',
    title: 'Tentante',
    title2: 'Aquela fase cheia de descobertas e expectativas.',
    subTitle: 'O começo de tudo',
    text: 'Foi dada a largada. Prepare-se para transformar sua vida! O planejamento da gravidez requer cuidados com a saúde física e emocional para que a vida do casal não se resuma em expectativas e incertezas.',
  },
  pregnant: {
    image: 'LogoSvg2',
    title: 'Gestante',
    title2: 'Aquela fase na qual o amor só cresce.',
    subTitle: 'Um projeto em dupla',
    text: 'Apesar de só uma metade da dupla carregar o bebê, é importante criar rituais para uma divisão de tarefas harmoniosa, que não sobrecarregue a mulher.',
  },
  breastfeeding: {
    image: 'LogoSvg1',
    title: 'Lactante',
    title2: 'Uma fase na qual a amamentação alimenta o futuro.',
    subTitle: 'Amamentação, desafios e amor',
    text: 'Longas rodadas de amamentação, permeando todas as tarefas da nova vida com o bebê. No meio disso tudo, uma bagunça de sentimentos.',
  },
  anotherResponsible: {
    image: 'LogoSvg1',
    title: 'Parceiro(a)',
    title2:
      'É quem fica do lado durante toda jornada, dividindo responsabilidades e multiplicando os cuidados.',
    subTitle: '',
    text: '',
  },
}

export const PodcastList: IPodcast[] = [
  {
    id: '1',
    audio: '1.mp3',
    title: 'O Período fértil',
    author: 'Com Bia Mendes',
    duration: '25:06',
  },
  {
    id: '2',
    audio: '2.mp3',
    title: 'Sexo tem hora?',
    author: 'Com Alessandra Nunes',
    duration: '25:06',
  },
]

export const articlesAndInterviews = [
  {
    id: '1',
    title: 'Nome do artigo',
    shortText:
      'Passados a gravidez e o parto, a mãe e a criança enfrentam um dos…',
    situation: ESituation.breastfeeding,
    imageUrl: '',
    spotlight: true,
  },

  {
    id: '2',
    title: 'Nome do artigo',
    shortText:
      'Passados a gravidez e o parto, a mãe e a criança enfrentam um dos…',
    situation: ESituation.breastfeeding,
    imageUrl: '',
    spotlight: true,
  },
]

const homes: any = {
  getPregnant: {
    backgroundImage: BackgroundGetPregnant,
    logoImage: LogoTentante,
    featuredImage: FeaturedImageGePregnant,
    colorDefault: theme.colors.primary,
    colorSecondary: theme.colors.secondary_light,
    buttonDefaultColor: theme.colors.primary,
    testBackgroundColor: theme.colors.primary,
    testButtonBackgroundColor: theme.colors.primary,
    testButtonColor: theme.colors.secondary_light,
    testColor: theme.colors.text_light,
    tableDigitalBackgroundColor: theme.colors.text_light,
    tableDigitalTitle: 'Tabelinha digital',
    tableDigitalTitleColor: theme.colors.secondary_light,
    tableDigitalSubTitle: 'Saiba o seu período fértil a cada ciclo menstrual.',
    tableDigitalSubTitleColor: theme.colors.text,
    tableCalendarImage: CalendarGetPregnant,
    tableDigitalButtonText: 'Ver minha tabelinha',
    podcastBackgroundColor: theme.colors.text_light,
    podcastTitleColor: theme.colors.secondary_light,
    articleBackgroundColor: theme.colors.text_light,
    articleTitleColor: theme.colors.secondary_light,
    videoBackgroundColor: theme.colors.text_light,
    videoTitleColor: theme.colors.secondary_light,
    videoSubTitleColor: theme.colors.text,
    videoBackgroundVideoColor: theme.colors.secondary_light,
    phasesBackgroundColor: theme.colors.text_light,
    phasesTitleColor: theme.colors.secondary_light,
    phasesSubTitleColor: theme.colors.text,
  },
  pregnant: {
    backgroundImage: BackgroundPregnant,
    logoImage: LogoPregnant,
    featuredImage: FeaturedImagePregnant,
    colorDefault: theme.colors.text_light,
    colorSecondary: theme.colors.primary,
    buttonDefaultColor: theme.colors.primary,
    testBackgroundColor: theme.colors.secondary_light,
    testButtonBackgroundColor: theme.colors.secondary_light,
    testButtonColor: theme.colors.primary,
    testColor: theme.colors.primary,
    tableDigitalBackgroundColor: theme.colors.text_light,
    tableDigitalTitle: 'Semana a semana',
    tableDigitalTitleColor: theme.colors.primary,
    tableDigitalSubTitle:
      'Acompanhe as mudanças no seu corpo e no bebê e registre as suas impressões',
    tableDigitalSubTitleColor: theme.colors.text,
    tableCalendarImage: CalendarPregnant,
    tableDigitalButtonText: 'Ver minhas semanas',
    podcastBackgroundColor: theme.colors.text_light,
    podcastTitleColor: theme.colors.primary,
    articleBackgroundColor: theme.colors.text_light,
    articleTitleColor: theme.colors.primary,
    videoBackgroundColor: theme.colors.text_light,
    videoTitleColor: theme.colors.primary,
    videoSubTitleColor: theme.colors.text,
    videoBackgroundVideoColor: theme.colors.primary,
    phasesBackgroundColor: theme.colors.text_light,
    phasesTitleColor: theme.colors.primary,
    phasesSubTitleColor: theme.colors.text,
  },
  breastfeeding: {
    backgroundImage: BackgroundBreastfeeding,
    logoImage: LogoPregnant,
    featuredImage: FeaturedImageBreastfeeding,
    colorDefault: theme.colors.text_light,
    colorSecondary: theme.colors.attention,
    buttonDefaultColor: theme.colors.primary,
    testBackgroundColor: theme.colors.blue,
    testButtonBackgroundColor: theme.colors.blue,
    testButtonColor: theme.colors.secondary,
    testColor: theme.colors.text_light,
    tableDigitalBackgroundColor: theme.colors.text_light,
    tableDigitalTitle: 'Amamentação',
    tableDigitalTitleColor: theme.colors.attention,
    tableDigitalSubTitle:
      'Registre as mamadas do seu bebê e salve todos os dados no histórico.',
    tableDigitalSubTitleColor: theme.colors.text,
    tableCalendarImage: CalendarBreastFeeding,
    tableDigitalButtonText: 'Monitor de mamadas',
    podcastBackgroundColor: theme.colors.text_light,
    podcastTitleColor: theme.colors.attention,
    articleBackgroundColor: theme.colors.text_light,
    articleTitleColor: theme.colors.attention,
    videoBackgroundColor: theme.colors.text_light,
    videoTitleColor: theme.colors.attention,
    videoSubTitleColor: theme.colors.text,
    videoBackgroundVideoColor: theme.colors.attention,
    phasesBackgroundColor: theme.colors.text_light,
    phasesTitleColor: theme.colors.attention,
    phasesSubTitleColor: theme.colors.text,
  },
  anotherResponsible: {
    backgroundImage: BackgroundResponsible,
    logoImage: LogoPregnant,
    featuredImage: FeaturedImageResponsible,
    colorDefault: theme.colors.blue,
    colorSecondary: theme.colors.text_light,
    buttonDefaultColor: theme.colors.primary,
    testBackgroundColor: theme.colors.attention,
    testButtonBackgroundColor: theme.colors.attention,
    testButtonColor: theme.colors.text_light,
    testColor: theme.colors.text_light,
    tableDigitalBackgroundColor: theme.colors.text_light,
    tableDigitalTitle: 'Amamentação',
    tableDigitalTitleColor: theme.colors.attention,
    tableDigitalSubTitle:
      'Registre as mamadas do seu bebê e salve todos os dados no histórico.',
    tableDigitalSubTitleColor: theme.colors.text,
    tableCalendarImage: CalendarBreastFeeding,
    tableDigitalButtonText: 'Ver minha tabelinha',
    podcastBackgroundColor: theme.colors.dark_grey,
    podcastTitleColor: theme.colors.text_light,
    articleBackgroundColor: theme.colors.dark_grey,
    articleTitleColor: theme.colors.text_light,
    videoBackgroundColor: theme.colors.dark_grey,
    videoTitleColor: theme.colors.text_light,
    videoSubTitleColor: theme.colors.text,
    videoBackgroundVideoColor: theme.colors.dark_grey,
    phasesBackgroundColor: theme.colors.dark_grey,
    phasesTitleColor: theme.colors.text_light,
    phasesSubTitleColor: theme.colors.text,
  },
}

export const getLayoutHome = (situation: TSituation) => {
  return homes[situation]
}
