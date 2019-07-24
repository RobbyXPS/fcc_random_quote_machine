//import any modules from libs
const { Provider, connect } = ReactRedux;
const { applyMiddleware, createStore, combineReducers, bindActionCreators } = Redux;

// List of random quotes
const Quotes = {
  Quote01: {
    quote: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    quotee: "William Butler Yeats" },

  Quote02: {
    quote: "Without hard work, nothing grows but weeds.",
    quotee: "Gordon B. Hinckley" },

  Quote03: {
    quote: "The key to immortality is first living a life worth remembering.",
    quotee: "Bruce Lee" },

  Quote04: {
    quote: "The most effective way to do it, is to do it.",
    quotee: "Amelia Earhart" },

  Quote05: {
    quote: "The way to get started is to quit talking and begin doing.",
    quotee: "Walt Disney" },

  Quote06: {
    quote: "Do not pray for an easy life. Pray for the strength to endure a difficult one.",
    quotee: "Bruce Lee" },

  Quote07: {
    quote: "If things start happening, don't worry, don't stew, just go right along and you'll start happening too.",
    quotee: "Dr. Seuss" },

  Quote08: {
    quote: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
    quotee: "Albert Camus" },

  Quote09: {
    quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
    quotee: "Chinese Proverb" },

  Quote10: {
    quote: "I dream my painting and I paint my dream.",
    quotee: "Vincent van Gogh" }



  //define action
};const CHANGE_MESSAGE = 'change_message';

//default app state
const defaultState = { quote: Quotes.Quote01.quote,
  quotee: Quotes.Quote01.quotee };

//create a random number from 1-10 to pull from quote list.
function createRandomNumber() {
  // create a random number but make sure the string is the 2 digit format for 10
  var ranNumb = '0' + Math.floor(Math.random() * 10 + 1);
  if (ranNumb == '010') {
    ranNumb = ranNumb.replace('010', '10');
  }
  return ranNumb;
}

//action creator for quote
let changeMessage = function (currentQuote) {
  //create string
  var randomQuoteNumb = "Quote" + createRandomNumber();
  //get the quote from the array
  var newQuote = Quotes[randomQuoteNumb]["quote"];
  //get the quotee from the array
  var newQuotee = Quotes[randomQuoteNumb]["quotee"];
  // make sure to get a random quote, but only try 10 times.
  i = 0;
  while (i < 10 && currentQuote == newQuote) {
    //get new quote
    var randomQuoteNumb = "Quote" + createRandomNumber();
    var newQuote = window["Quotes"][randomQuoteNumb]["quote"];
    var newQuotee = window["Quotes"][randomQuoteNumb]["quotee"];
    i++;
  }
  return {
    type: CHANGE_MESSAGE,
    payload_quote: newQuote,
    payload_quotee: newQuotee };


};

//reducer
const messageReducer = function (state = defaultState, action) {
  switch (action.type) {
    case CHANGE_MESSAGE:
      return Object.assign({}, state, {
        quote: action.payload_quote,
        quotee: action.payload_quotee });

    default:
      return state;}

};

//create store
const store = Redux.createStore(messageReducer);

//component one is a button
class ReduxButton extends React.Component {
  constructor(props) {
    super(props);
    //constructor can be removed if I move bind into render
    this.updateMessage = this.updateMessage.bind(this);
  }

  updateMessage() {
    //get the current message displayed from textfield element with id 'text'
    var displayedQuote = document.getElementById("text").textContent;
    //pass the current quote to changeMessage for comparison 
    this.props.my_dispatch_prop_new_quote(displayedQuote);
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("button", { id: "new-quote", onClick: this.updateMessage }, "New Quote")));


  }}


// component two is a text field
class ReduxTextField extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "text-holder" },
      React.createElement("div", { id: "text" }, this.props.my_state_prop_quote),
      React.createElement("div", { id: "author" }, "~ ", this.props.my_state_prop_quotee)));


  }}


// component three is a tweet button
class TweetButton extends React.Component {
  render() {
    return (
      React.createElement("a", { id: "tweet-quote", class: "fa fa-twitter-square", href: "twitter.com/intent/tweet" }));

  }}


//connect react to redux by mapping app state to props
const mapStateToProps = state => {
  return {
    my_state_prop_quote: state.quote,
    my_state_prop_quotee: state.quotee };

};

//connect react to redux by mapping dispatch actions to props
const mapDispatchToProps = dispatch => {
  return {
    my_dispatch_prop_new_quote: function (message) {
      dispatch(changeMessage(message));
    } };

};

//Make the React components to Redux Containers
const ReduxButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ReduxButton);
const ReduxTextFieldContainer = connect(mapStateToProps, null)(ReduxTextField);
const TweetButtonContainer = connect(null, null)(TweetButton);


//Create the main app container which contains the button and text field
class App extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "quote-box" },
      React.createElement(ReduxTextFieldContainer, null),
      React.createElement("div", { id: "button-box" },
      React.createElement(TweetButtonContainer, null),
      React.createElement("div", { id: "spacer" }),
      React.createElement(ReduxButtonContainer, null))));



  }}


//render the App componenet with the provider
ReactDOM.render(
React.createElement(Provider, { store: store },
React.createElement(App, null)),

document.getElementById('root'));