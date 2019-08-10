import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    alignItems: 'center',
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
  section: {
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    width: '100%'
  }
});

export const btnStyles = StyleSheet.create({
  button: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: 120
  },
  buttonText: {
    fontSize: 26
  }
})

export const inputStyles = StyleSheet.create({
  inputRow: {
    flexDirection: "row"
  },
  labelContainer: {
    justifyContent: 'center'
  },
  label: {
    justifyContent: 'center',
    fontSize: 26,
    marginRight: 10
  },
  input: {
    width: 70,
    textAlign: "center",
    fontSize: 26,
    backgroundColor: 'gainsboro',
    borderRadius: 5
  }
})