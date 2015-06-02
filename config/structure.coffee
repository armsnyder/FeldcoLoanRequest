# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
#  tabs: [
#    {
#      title: "Index"
#      id: "index"
#      location: "example#getting-started" # Supersonic module#view type navigation
#    }
#    {
#      title: "Settings"
#      id: "settings"
#      location: "example#settings"
#    }
#    {
#      title: "Internet"
#      id: "internet"
#      location: "http://google.com" # URLs are supported!
#    }
#  ]

  rootView:
    location: "common#clientList"

  preloads: [
    {
      id: "applicationForm"
      location: "common#applicationForm"
    },
    {
      id: "clientList"
      location: "common#clientList"
    },
  ]


  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  initialView: {
    id: "login"
    location: "common#login"
  }
