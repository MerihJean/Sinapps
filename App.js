import React from "react"
import { Text, View } from "react-native"

// import du serveur miragejs
import { createServer } from "miragejs"

// import du fichier contenant lesles longitudes et latitudes des parkings du wsf
import position from './out.js';

// Si le serveur est déjà en fonctionnement, fermer ce dernier
if (window.server) {
  server.shutdown()
}

// Creation du serveur en exposant la méthode GET à l'utilisateur du service
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

  // variable position qui va inclure le contenu du fichier "out.js"
  state = {
    position: []
  }

  // récupération des longitudes et latitudes depuis l'API avec fetch et leurs insertions dans la variable "position"
  async componentDidMount(){
    fetch("/api/position")
    .then((res) => res.json())
    .then((json) => this.setState({position: json.position1}))
  }

  render() {
  return (

    // La liste d'affichage des longitudes et latitudes de chaque parking inclut dans le wsf
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