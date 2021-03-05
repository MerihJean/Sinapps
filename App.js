import React from "react"
import { Text, View } from "react-native"
import { createServer } from "miragejs"
import position from './out.js';

if (window.server) {
  server.shutdown()
}

window.server = createServer({
  routes() {
    this.get("/api/position", () => {
      return {
        position1: position
      }
    })
  },
})
export default class App extends React.Component {
  state = {
    position: []
  }
  async componentDidMount(){
    fetch("/api/position")
    .then((res) => res.json())
    .then((json) => this.setState({position: json.position1}))
  }
  render() {
  return (
    <View>
      {this.state.position.map((position) => (
        <Text key={position.gmlpos}>
          {position.gmlpos}
        </Text>
      ))}
    </View>
  )
  }
}