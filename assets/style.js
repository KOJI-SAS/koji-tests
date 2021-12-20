import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    gradient: {
        height: '100%',
        width: '100%'
      },
    container: {
        flex: 1,
        paddingTop: '5%',
        backgroundColor: '#455056',
      },
    defaultView: {
        borderRadius: 10,
        shadowRadius: 2,
        shadowOpacity: 0.5,
        borderWidth: 0.3,
        borderColor: 'white',
        shadowOpacity: 0.5,
    },
    errorView: {
        marginTop: '10%',
        paddingVertical: '10%',
        marginHorizontal: '10%',
        borderRadius: 10,
        shadowRadius: 2,
        shadowOpacity: 0.5,
        borderWidth: 0.3,
        borderColor: 'red',
        shadowOpacity: 0.5,
    },
    errorText:{
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export const actualMeteoStyle = StyleSheet.create({
    gradient: {
        height: '100%',
        width: '100%'
      },
    container: {
        backgroundColor: 'black',
        marginLeft: '15%',
        marginRight: '15%',
        opacity: 0.6,
        paddingVertical: '5%',
        marginTop: '10%',
      },
      text: {
        color: 'white',
        textAlign: 'center',
      },
      textInformation: {
        marginVertical: 3,
      },
      icon: {
        width: 125,
        height: 125,
      },
      iconView:{
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: '3%',
      },
      textCity:{
        fontSize: 20,
        marginBottom: '3%',
        fontWeight: 'bold',
      }
})
export const searchStyle = StyleSheet.create({
    container: {
        marginTop: '5%',
        marginRight: '3%',
        marginLeft: '3%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: '7%',
        paddingVertical: 5,
        color: 'white',
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'white',
      },
      flatlist: {
        justifyContent: 'center',
        marginHorizontal: '10%',
        backgroundColor: '#455056',
        opacity: 0.9,
      }
})