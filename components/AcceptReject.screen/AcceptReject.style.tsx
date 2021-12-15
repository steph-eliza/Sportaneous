import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    borderColor: '#DADBDF',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: windowWidth / 3,
    textAlign: 'center',
    paddingBottom: 5,
  },
  name: {
    textAlign: 'right',
    fontSize: 22,
    width: windowWidth / 3,
  },
  navigate: {
    marginBottom: 10,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: "#6C5DAB",
    padding: 8,
    alignSelf: "center",
  },
  acceptReject: {
    marginBottom: 10,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: "#323B76",
    padding: 8,
    color: '#fff',
    alignSelf: "center",
},
buttonsText: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 17,
    textTransform: "uppercase"
  },
  popUpText: {
    color: 'whitesmoke',
    fontSize: 17,
    textAlign: 'center',
    margin: 20,
  },
})
