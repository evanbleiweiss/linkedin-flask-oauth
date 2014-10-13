R = React.DOM

Profile = React.createClass(
  getInitialState: ->
    data: []

  loadRemoteData: (url) ->
    $.ajax
      url: url
      dataType: "json"
      success: ((data) ->
        console.log('Successfully fetched ' + @props.url)
        @setState
          data: @state.data.concat([data])
        return
      ).bind(this)
      error: ((xhr, status, err) ->
        console.error @props.url, status, err.toString()
        return
      ).bind(this)
    return

  render: ->
    R.div null,
      LoginHelper url: '/logout', text: 'Log Out'
      Name url: '/name', getData: @loadRemoteData, data: @state.data[0]
      Location url: '/location', getData: @loadRemoteData, data: @state.data[1]
)

LoginHelper = React.createClass(
  componentDidMount: ->
    @props.checkLogin()

  render: ->
    R.a href: @props.url, @props.text
)

Name = React.createClass(
  componentWillMount: ->
    @props.getData(@props.url)

  render: ->
    R.div {className: 'animated bounceIn'}, 'Welcome, ',
      R.span {className: 'name'}, @props.data
)

Location = React.createClass(
  componentWillMount: ->
    @props.getData(@props.url)
  
  render: ->
    R.div { className: 'location' }, 'Coming to you from the ',
      R.span id:"location", className:"animated slideInRight", @props.data
)

React.renderComponent Profile(), document.getElementById('profile')
