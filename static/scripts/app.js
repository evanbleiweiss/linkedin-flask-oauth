var Location, LoginHelper, Name, Profile, R;

R = React.DOM;

Profile = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  loadRemoteData: function(url) {
    $.ajax({
      url: url,
      dataType: "json",
      success: (function(data) {
        console.log('Successfully fetched ' + this.props.url);
        this.setState({
          data: this.state.data.concat([data])
        });
      }).bind(this),
      error: (function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  render: function() {
    return R.div(null, LoginHelper({
      url: '/logout',
      text: 'Log Out'
    }), Name({
      url: '/name',
      getData: this.loadRemoteData,
      data: this.state.data[0]
    }), Location({
      url: '/location',
      getData: this.loadRemoteData,
      data: this.state.data[1]
    }));
  }
});

LoginHelper = React.createClass({
  componentDidMount: function() {
    return this.props.checkLogin();
  },
  render: function() {
    return R.a({
      href: this.props.url
    }, this.props.text);
  }
});

Name = React.createClass({
  componentWillMount: function() {
    return this.props.getData(this.props.url);
  },
  render: function() {
    return R.div({
      className: 'animated bounceIn'
    }, 'Welcome, ', R.span({
      className: 'name'
    }, this.props.data));
  }
});

Location = React.createClass({
  componentWillMount: function() {
    return this.props.getData(this.props.url);
  },
  render: function() {
    return R.div({
      className: 'location'
    }, 'Coming to you from the ', R.span({
      id: "location",
      className: "animated slideInRight"
    }, this.props.data));
  }
});

React.renderComponent(Profile(), document.getElementById('profile'));
