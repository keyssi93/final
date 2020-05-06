import React from 'react';
import './App.css';
import  './data.js';
import {today,hotelsData} from './data.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        dateFrom: today, 
        dateTo: new Date(today.valueOf() + 86400000),
        country: '',
        price: '',
        rooms: ''
      },
      hotels: hotelsData
    };
    this.handleOptionChange=this.handleOptionChange.bind(this)
    this.filterHotels=this.filterHotels.bind(this)
  }
  
  handleOptionChange(payload) {
    this.setState({
      filters: payload
    })
  }

  filterHotels(hotel) {
    const { filters } = this.state;
    if ((filters.dateFrom && filters.dateFrom > hotel.availabilityFrom)
      || (filters.dateTo && filters.dateTo< hotel.availabilityTo)
      || (filters.country && filters.country !== hotel.country)
      || (filters.price && filters.price !== hotel.price)
      || (filters.rooms === 10 && hotel.rooms > 10)
      || (filters.rooms === 20 && (hotel.rooms <= 10 || hotel.rooms > 20))
      || (filters.rooms === 30 && hotel.rooms <= 20)) return false;

    return true;
  }


  render() {

    return (
      <div>
        <Hero filters={ this.state.filters } />
        <Filters
          filters={ this.state.filters }
          onFilterChange={ this.handleFilterChange }
        />
        <Hotels data={this.state.hotels.filter(this.filterHotels)} />      
      </div>
    )
  }
  }
class Hero extends React.Component {
  render(){
  const formato = {weekday: "long",
  year: "numeric", 
  month: "long", 
  day: "numeric", 
}
  return (
    <section className="hero is-primary">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">Hoteles</h1>
        <h2 className="subtitle">
        desde el <strong onChange={this.handledatechange}>{this.props.filters.dateFrom.toLocaleString("es-ES", formato)}</strong> hasta el <strong>{this.props.filters.dateTo.toLocaleString("es-ES", formato)}</strong>
        </h2> 
      </div>
    </div>
  </section>
  )
}}
class DateFilter extends React.Component {
  constructor(props){super(props)
  this.handledatechange =this.handledatechange.bind(this)}
  handledatechange(event){
    this.props.ondatechange(event)}
  render(){
    return(
  <div className="field">
  <input className="input" type="date" onchange={this.handledatechange} value={this.date} name={this.props.name} />
  <div className="control has-icons-left">
    <span className="icon is-small is-left">
      <i className="fas"></i>
    </span>
  </div>
</div>)}
}
class OptionsFilter extends React.Component { 
 
  render() { 
   
  return(
  <div className="field">
  <div className="control has-icons-left">
    <div className="select" style={ {width: '100%'} }>
      <select onChange={this.handleFilterChange} style={ {width: '100%'} }>
    {this.props.options.map(option=>{
      return(
        <option key={option.name} value={option.value}>
          {option.name}
        </option>
      )
    }

    )}
      
        
      </select>
    </div>
    <div className="icon is-small is-left">
  <i className="fas"></i>
    </div>
  </div>
</div>)}
}
class Filters extends React.Component{
  handleOptionChange(event) {
    let payload = this.props.filters;
    payload[event.target.name] = event.target.value;
    this.props.onFilterChange(payload);
  }
  render(){
  return(
<nav className="navbar is-info" style={ {justifyContent: 'center'} }>
  <div className="navbar-item">
    <DateFilter
      date={ this.props.filters.dateFrom}
      icon="sign-in-alt" />
  </div>
  <div className="navbar-item">
    <DateFilter
      date={ this.props.filters.dateTo }
      icon="sign-out-alt" />
  </div>
  <div className="navbar-item">
  <OptionsFilter
      options={ [ {value: undefined, name: 'Todos los países'}, {value: 'Argentina', name: 'Argentina'}, {value: 'Brasil', name: 'Brasil'}, {value: 'Chile', name: 'Chile'}, {value: 'Uruguay', name: 'Uruguay'} ] }
      selected={ this.handleOptionChange }
      icon="globe" />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Cualquier precio'}, {value: 1, name: '$'}, {value: 2, name: '$$'}, {value: 3, name: '$$$'}, {value: 4, name: '$$$$'} ] }
      selected={ this.props.filters.price }
      icon="dollar-sign" />
  </div>
  <div className="navbar-item">
    <OptionsFilter
      options={ [ {value: undefined, name: 'Cualquier tamaño'}, 
      {value: 10, name: 'Hotel pequeño'},
      {value: 20, name: 'Hotel mediano'},
      {value: 30, name: 'Hotel grande'} ] }
      selected={ this.props.filters.rooms }
      icon="bed" />
  </div>
</nav>
  )
}}
class Hotel extends React.Component {
  
  
   render(){
    const { data } = this.props;
  return (
    <div className="card">
  <div className="card-image">
    <figure className="image is-4by3">
      <img src={data.photo} alt="foto" />
    </figure>
  </div>
  <div className="card-content">
  <p className="title is-4">{data.name}</p>
  <p>{data.description}</p>
    <div className="field is-grouped is-grouped-multiline" style={{marginTop: '1em'}}>
      <div className="control">
      <div className="tags has-addons">
          <span className="tag is-medium is-info"><i className="fas fa-map-marker"></i></span>
  <span className="tag is-medium">{data.city},{data.country} </span>
        </div>
      </div>
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-medium is-info"><i className="fas fa-bed"></i></span>
          <span className="tag is-medium">{data.rooms} Habitaciones</span>
        </div>
      </div>
      <div className="control">
        <div className="tags">
          <span className="tag is-medium is-info">
            <i className="fas fa-dollar-sign" style={{margin: '0 .125em'}}></i>
            <i className="fas fa-dollar-sign" style={{margin: '0 .125em'}}></i>
            <i className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: '.25'}}></i>
            <i className="fas fa-dollar-sign" style={{margin: '0 .125em', opacity: '.25'}}></i>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div className="card-footer">
  <a href="javascript:alert('No implementamos esto aún :(')" className="card-footer-item has-background-primary has-text-white has-text-weight-bold">Reservar</a>
</div>
</div>
 
  )
}}



class Hotels extends React.Component {
 
render(){
  
return (
  <section className="section" style={ {marginTop: '3em'} }>
  {hotelsData.length 
    ? (
      <div className="container">
        <div className="columns is-multiline">
          {hotelsData.map(hotels => (
            <div key={ hotels.slug } className="column is-one-third">
              <Hotel data={ hotels } />
            </div>
            ))}
        </div>
      </div>
    )
    : (
      <article className="message is-warning">
        <div className="message-body">
          No se han encontrado hoteles que coincidan con los parámetros de búsqueda.
        </div>
      </article>
    )
  }
</section>
)
}}
export default App;