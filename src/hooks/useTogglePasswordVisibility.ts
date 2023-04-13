import {useCallback, useState} from 'react'

import {MaterialCommunityIcons} from '@expo/vector-icons'

type TCustomComponentProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
}
export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] =
    useState<TCustomComponentProps['icon']>('eye-off')

  const handlePasswordVisibility = useCallback(() => {
    if (rightIcon === 'eye-off') {
      setRightIcon('eye')
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === 'eye') {
      setRightIcon('eye-off')
      setPasswordVisibility(!passwordVisibility)
    }
  }, [rightIcon, passwordVisibility])

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  }
}
