import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class Grade extends Component {
  state = {
    categories: [],
    grade: 0,
    categoryForm: {
      grade: 0,
      weigth: 0,
      name: ""
    }
  };
  handleCategoryForm = (event) => {
    event.preventDefault();
    if(this.state.categoryForm.name !== ""){
      let temp = this.state.categories;
      temp.push([this.state.categoryForm.name,this.state.categoryForm.grade,this.state.categoryForm.weight]);
      this.setState({
        categories: temp
      });
    }
  };
  handleCategoryFormChange = (event) =>{
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let temp = this.state.categoryForm;
    temp[name] = value
    this.setState({
      categoryForm: temp
    });
  };
  render() {
    return(
      <div className="category-components">
        <CategoryForm submit={this.handleCategoryForm} onchange = {this.handleCategoryFormChange} categoryName={this.state.categoryForm.name} categoryGrade={this.state.categoryForm.grade} categoryWeight={this.state.categoryForm.weight} />
        <CategoryList categories={this.state.categories}/>
      </div>
    );
  }
}
const CategoryList = (props) => {
  const cats = props.categories;
  const list = cats.map((category) =>
      <Category name={category[0]} grade={category[1]} weight={category[2]} />
  );
  return(
    <div className="category-list">
      {list}
    </div>
  );
};
const CategoryForm = (props) => {
    return(
      <form onSubmit={props.submit} className="category-form">
        <h1>Create New Category</h1>
        <label>
          Name:
          <input type="text" name="name" id="name" onChange={props.onchange} value={props.categoryName} />
        </label>
        <label>
          Grade:
          <input type="number" name="grade" id="grade" onChange={props.onchange} value={props.categoryGrade} />
        </label>
        <label>
          Weight
          <input type="number" name="weight" id="weight" onChange={props.onchange} value={props.categoryWeight}/>
        </label>
        <input type="submit" value="Add"/>
      </form>
    );
};
const Category = (props) => {
  return(
    <div className="category">
      <h1>{props.name}</h1>
      <h3>Grade: {props.grade}%</h3>
      <p>Weight: {props.weight}%</p>
    </div>
  );
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Grade Calculator</h1>
        </header>
        <Grade />
      </div>
    );
  }
}

export default App;
