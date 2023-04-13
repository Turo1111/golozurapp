import { StyleSheet, Text, View, Modal } from 'react-native'
import React,{useState} from 'react'
import { useAlert } from '../context/AlertContext'
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

const styles = StyleSheet.create({
})