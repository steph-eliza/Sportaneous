import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
    width: windowWidth / 1,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    paddingBottom: 20,
  },
  avatar: {
    borderRadius: 100,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  inputTitle: {
    textAlign: 'left',
    textTransform: 'uppercase',
    paddingBottom: 3,
  },
  inputField: {
    height: 45,
    width: 250,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#DADBDF',
    borderWidth: 1,
  },
  submit: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginVertical: 20,
    padding: 8,
    backgroundColor: '#2B2C33',
    borderRadius: 2,
    width: 100,
  },
  submitText: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 17,
    textTransform: 'uppercase',
  },
})
