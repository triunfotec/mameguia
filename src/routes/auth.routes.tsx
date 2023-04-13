import React from 'react'

import ChooseCategoryScreen from '@/screens/ChooseCategory/ChooseCategoryScreen'
import ForgotMyPasswordScreen from '@/screens/ForgotMyPassword/ForgotMyPasswordScreen'
import IntroductionScreen from '@/screens/Introduction/IntroductionScreen'
import PrivacyPolicyScreen from '@/screens/PrivacyPolicy/PrivacyPolicyScreen'
import SignInScreen from '@/screens/SignIn/SignInScreen'
import SignUpScreen from '@/screens/SignUp/SignUpScreen'
import SmsScreen from '@/screens/Sms/SmsScreen'
import TermsScreen from '@/screens/Terms/TermsScreen'
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

interface IAuthRoutes {
  isSignOut: boolean
}
const AuthRoutes: React.FC<IAuthRoutes> = ({isSignOut}) => {
  return (
    <Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={isSignOut ? 'SignIn' : 'Introduction'}>
      <Screen name="Introduction" component={IntroductionScreen} />
      <Screen name="Terms" component={TermsScreen} />
      <Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
      <Screen name="Sms" component={SmsScreen} />
      <Screen name="SignIn" component={SignInScreen} />
      <Screen name="ForgotMyPassword" component={ForgotMyPasswordScreen} />
      <Screen name="ChooseCategory" component={ChooseCategoryScreen} />
    </Navigator>
  )
}

export default AuthRoutes
