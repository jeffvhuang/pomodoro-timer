import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    // alignItems: 'center',
    flex: 2
  },
  headerText: {
    fontSize: 48,
  },
  controlsSection: {
    flex: 3,
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
  },
  input: {
    width: 100,
    textAlign: "center"
  },
  section: {
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    fontSize: 42,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    // flex: 1,
    // width: 100
    // justifyContent: 'center'
  }
});

export const btnStyles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: 120
  },
  buttonText: {
    fontSize: 24
  },

})