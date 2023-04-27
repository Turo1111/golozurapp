import { Modal } from 'react-native'
import React from 'react'
import Loading from './Loading'
import { useLoading } from '../context/LoadingContext'

export default function ModalLoading() {

  const {open} = useLoading()

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
    >
      <Loading/>
    </Modal>
  )
}
