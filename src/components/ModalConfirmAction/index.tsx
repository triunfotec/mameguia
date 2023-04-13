import React from 'react'
import {TouchableNativeFeedback, View} from 'react-native'
import Modal from 'react-native-modal'

import {useTheme} from 'styled-components'

import {
  ViewModal,
  ButtonCloseView,
  ModalAskText,
  ButtonsView,
  ButtonModalView,
  ButtonText,
} from '@/components/ModalConfirmAction/styles'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'

type TModalConfirmActionProps = {
  visible: boolean
  handleModalVisible: (visible: boolean) => void
  askText: string
  handleActionYes: () => void
  statusAction: IActionStatus
}

const ModalConfirmActionComponent = ({
  visible,
  handleModalVisible,
  askText,
  handleActionYes,
  statusAction,
}: TModalConfirmActionProps) => {
  const theme = useTheme()

  return (
    <View>
      <Modal isVisible={visible}>
        <ViewModal>
          <TouchableNativeFeedback
            onPress={() => {
              handleModalVisible(false)
            }}>
            <ButtonCloseView>
              <MaterialCommunityIcons
                name="close"
                size={22}
                color={theme.colors.blue}
              />
            </ButtonCloseView>
          </TouchableNativeFeedback>

          <ModalAskText>{askText}</ModalAskText>

          <ButtonsView>
            <TouchableNativeFeedback onPress={() => handleActionYes()}>
              <ButtonModalView backgroundColor={theme.colors.blue}>
                {statusAction?.status !== EActionTypeStatus.Busy && (
                  <ButtonText>Sim</ButtonText>
                )}
                {statusAction?.status === EActionTypeStatus.Busy && (
                  <ButtonText>Excluindo...</ButtonText>
                )}
              </ButtonModalView>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={() => {
                handleModalVisible(false)
              }}>
              <ButtonModalView backgroundColor={theme.colors.blue}>
                <ButtonText>Não</ButtonText>
              </ButtonModalView>
            </TouchableNativeFeedback>
          </ButtonsView>
        </ViewModal>
      </Modal>
    </View>
  )
}

export default ModalConfirmActionComponent
