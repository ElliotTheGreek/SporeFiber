import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        paddingTop: 30, 
        backgroundColor: '#e9ebee' 
    },
    tableHead: { 
        height: 40, 
        backgroundColor: '#f1f8ff' 
    },
    tableText: { 
        margin: 6,
        fontWeight: 'bold',
        fontSize: 20
    },
    head: { 
        height: 40, 
        backgroundColor: '#f1f8ff',
        padding: 10,
        margin: 20,
        flex: 1,
        flexDirection: 'row'
    },
    text: { 
        margin: 6,
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonText: {
        fontSize: 20,
        marginLeft: 20,
        textAlign: 'center'
    },
    bottomNav: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 12,
        marginBottom: 12,
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonStyle: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        color: "#909090",
        borderColor: '#909090',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#e8e8e8'
    },
    smallButton: {
        borderRadius: 5,
        padding: 5,
        color: "#909090",
        borderColor: '#909090',
        borderWidth: 1,
        flex: 0,
        fontWeight: 'normal',
        backgroundColor: '#e8e8e8'
    },
    keepRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    buttonStyleDanger: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#e6a233',
        borderRadius: 10
    },
    centerContainer: {
        alignItems: 'center',
        margin:10
    },
    codeDisplay: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center'
    },
    small: {
        color: 'black',
        fontStyle: 'italic',
        fontSize: 12,
        alignItems: 'center'
    },
    input: {
        borderWidth: 2, 
        borderColor: '#c8e1ff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth: 1,
        alignSelf: 'stretch',
        marginTop: 15,
        marginBottom: 15,
        width: "100%",
        fontWeight: 'bold',
        fontSize: 20,
        borderRadius: 5,
        padding: 10
    },
    post: {
        borderColor: '#636363',
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 0,
        marginBottom: 5
    },
    postText: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
    },
    buttonIcon: {
        fontSize: 30,
        padding: 5,
        justifyContent: 'flex-start',
    },
    icons: {
        fontSize: 30,
        color: "#FFF",
        alignItems: 'center',
        padding: 10,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    iconsDanger: {
        fontSize: 30,
        color: "#e6a233",
        alignItems: 'center',
        padding: 10,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
      drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        marginTop: 20,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
});