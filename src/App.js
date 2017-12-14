import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class Grade extends Component {
  state = {
    categories: [],
    grade: 0.00,
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
      let tempCat = <Category name={this.state.categoryForm.name} grade={this.state.categoryForm.grade} weight={this.state.categoryForm.weight} destroy={this.categoryDestory} index={this.state.categories.length - 1} />;
      temp.push(tempCat);
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
    temp[name] = value;
    this.setState({
      categoryForm: temp
    });
  };
  categoryDestory = (index) => {
    let temp = this.state.categories;
    if (index !== -1){
      temp.splice(index,1);
    }
    this.setState({
      categories: temp
    });
  };
  render() {
    return(
      <div className="body-components">
        <div className="Grade">
          <h1>Grade: {this.state.grade}</h1>
        </div>
        <div className="category-components">
          <CategoryForm submit={this.handleCategoryForm} onchange = {this.handleCategoryFormChange} categoryName={this.state.categoryForm.name} categoryGrade={this.state.categoryForm.grade} categoryWeight={this.state.categoryForm.weight} categoryIndex={0} />
          <CategoryList categories={this.state.categories} submit={this.handleCategoryForm} onchange = {this.handleCategoryFormChange} categoryForm={this.state.categoryForm}/>
        </div>
      </div>
    );
  }
}
const CategoryList = (props) => {
  const cats = props.categories;
  const list = cats.map((category) =>
      <div>{category}</div>
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
          <input type="text" name="name" id={props.categoryIndex} onChange={props.onchange} value={props.categoryName} />
        </label>
        <label>
          Grade:
          <input type="number" name="grade" id={props.categoryIndex} onChange={props.onchange} value={props.categoryGrade} />
        </label>
        <label>
          Weight
          <input type="number" name="weight" id={props.categoryIndex} onChange={props.onchange} value={props.categoryWeight}/>
        </label>
        <input type="submit" value="Add"/>
      </form>
    );
};
class Category extends Component {
  state = {
    name: "",
    weight: 0,
    grade: 0,
    assignments: [],
    index: 0,
    points: 0,
    pointsPossible: 0,
    assignmentForm: {
      name: "",
      points: 0,
      pointsPossible: 0
    }
  };
  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      weight: props.weight,
      grade: props.grade,
      destroy: props.destroy,
      index: props.index,
      assignments: [],
      points: 0,
      pointsPossible: 0,
      assignmentForm: {
        name: "",
        points: 0,
        pointsPossible: 0
      }
    }
  }
  assignmentFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.assignmentForm.name !== ""){
      let temp = this.state.assignments;
      let tempCat = <Assignment name={this.state.assignmentForm.name} points={this.state.assignmentForm.points} pointsPossible={this.state.assignmentForm.pointsPossible} />;
      temp.push(tempCat);
      this.setState((prevState) => ({
        assignments: temp,
        points: prevState.points+parseInt(this.state.assignmentForm.points,10),
        pointsPossible: prevState.pointsPossible+parseInt(this.state.assignmentForm.pointsPossible,10),
        grade: (prevState.points+parseInt(this.state.assignmentForm.points,10))/(prevState.pointsPossible+parseInt(this.state.assignmentForm.pointsPossible,10))*100
      }));
    }
  }
  assignmentFormChange = (event) =>{
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let temp = this.state.assignmentForm;
    temp[name] = value;
    this.setState({
      assignmentForm: temp
    });
  }
  render(){
    return(
      <div className="category">
        <h1>{this.state.name}</h1>
        <h3>Grade: {this.state.grade}%</h3>
        <p>Weight: {this.state.weight}%</p>
        <AssignmentForm submit={this.assignmentFormSubmit} onChange={this.assignmentFormChange} name={this.state.assignmentForm.name} points={this.state.assignmentForm.points} pointsPossible={this.state.assignmentForm.pointsPossible} />
        <AssignmentList assignments={this.state.assignments}/>
        <button onClick={(index) => this.state.destroy(index)}>Delete</button>
      </div>
    );
  };
};
const AssignmentForm = (props) => {
  return(
    <form onSubmit={props.submit}>
      <label>
        Name:
        <input type="text" name="name" id="name" onChange={props.onChange} value={props.name}/>
      </label>
      <label>
        Points Earned:
        <input type="number" name="points" id="points" onChange={props.onChange} value={props.points}/>
      </label>
      <label>
        Points Possible:
        <input type="number" name="pointsPossible" id="pointsPossible" onChange={props.onChange} value={props.pointsPossible}/>
      </label>
      <input type="submit" value="Add" />
    </form>
  );
}
const AssignmentList = (props) => {
  let assignments = props.assignments.map((assignment) =>
    <div>{assignment}</div>
  );
  return(
    <div className="assignment-list">
      {assignments}
    </div>
  );
};
class Assignment extends Component {
  state = {
    points: 0,
    pointsPossible: 0,
    name: ""
  }
  constructor(props){
    super(props);
    this.state = {
      points: props.points,
      pointsPossible: props.pointsPossible,
      name: props.name
    };
  }
  render(){
    return(
      <div>
        <h5>{this.state.name}</h5>
        <p>{this.state.points}/{this.state.pointsPossible} - {this.state.points/this.state.pointsPossible*100}%</p>
      </div>
    );
  }
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Grade Calculator</h1>
        </div>
        <Grade />
      </div>
    );
  }
}

export default App;
