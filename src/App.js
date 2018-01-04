import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faBook, faRetweet, faEdit} from '@fortawesome/fontawesome-free-solid'
class Grade extends Component {
  state = {
    categories: [],
    grade: 0.00,
    grades: [],
    weights: [],
    names: [],
    ids: [],
    categoryCount: 0,
    categoryForm: {
      weigth: 0,
      name: ""
    }
  };
  validWeights = (w,id) => {
    let total = 0;
    let underHundred = true;
    let weights = this.state.weights;
    let found = false;
    for(let i = 0; i < this.state.categories.length; i++){
      if(this.state.ids[i] === id){
        weights.splice(i,1,w);
        found = true;
      }
    }
    for(let i = 0; i < this.state.categories.length; i++){
      total += weights[i];
    }
    if(!found){
      total += w;
    }
    if (total > 100){
      underHundred = false;
    }
    console.log(total);
    this.setState({
      weights: weights
    });
    return underHundred;
  }
  handleCategoryForm = (event) => {
    event.preventDefault();
    if(this.state.categoryForm.name !== "" && this.state.categoryForm.weight > 0 && this.state.categoryForm.weight < 100 && this.validWeights(parseInt(this.state.categoryForm.weight,10),this.state.categoryCount)){
      let temp = this.state.categories;
      let tempCat = <Category name={this.state.categoryForm.name} weight={this.state.categoryForm.weight} destroy={this.categoryDestory} index={this.state.categories.length - 1} updateGrade={this.updateGrade} id={this.state.categoryCount} validWeights={this.validWeights}/>;
      temp.push(tempCat);
      let names = this.state.names;
      let grades = this.state.grades;
      let weights = this.state.weights;
      let ids = this.state.ids;
      names.push(this.state.categoryForm.name);
      grades.push(0);
      weights.push(parseInt(this.state.categoryForm.weight,10));
      ids.push(this.state.categoryCount);
      this.setState({
        grades: grades,
        names: names,
        weights: weights,
        ids: ids
      });
      this.setState((prevState) => ({
        categories: temp,
        grade: prevState.grade + (this.state.categoryForm.grade*this.state.categoryForm.weight*10),
        categoryCount: prevState.categoryCount + 1
      }));
      this.setState({
        categoryForm: {
          name: "",
          weight: 0
        }
      });
    }else{
      alert("Please Make Sure You Fill Out Both Fields. The weight must be a value between 0 and 100.");
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
  updateGrade = (info) => {
    let grade = 0;
    let index = -1;
    for(let i = 0; i < this.state.names.length; i ++){
      if(parseInt(info.id,10) === parseInt(this.state.ids[i],10)){
        index = i;
        console.log("found");
      }
    }
    let names = this.state.names;
    let grades = this.state.grades;
    let weights = this.state.weights;
    let ids = this.state.ids;
    if (index !== -1){
      names.splice(index,1);
      grades.splice(index,1);
      weights.splice(index,1);
      ids.splice(index,1);
    }else{
      console.log(info.id);
    }
    names.push(info.name);
    grades.push(parseInt(info.grade,10));
    weights.push(parseInt(info.weight,10));
    ids.push(info.id);
    for(let i = 0; i < names.length; i++){
      grade += grades[i]*weights[i]*(1/100)
    }
    this.setState({
      grade: grade,
      grades: grades,
      names: names,
      weights: weights,
      ids: ids
    });
  };
  render() {
    return(
      <div className="body-components">
        <div className="grade">
          <h1>Grade: {this.state.grade}%</h1>
        </div>
        <div className="category-components">
          <div className="category-form">
            <h1>Create New Category</h1>
            <CategoryForm submit={this.handleCategoryForm} onchange = {this.handleCategoryFormChange} categoryName={this.state.categoryForm.name} categoryGrade={this.state.categoryForm.grade} categoryWeight={this.state.categoryForm.weight} categoryIndex={0} submitContent={"Add"} submitIcon={faPlus} />
          </div>
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
      <form onSubmit={props.submit} className="">
        <label>
          Name:
          <input type="text" name="name" id={props.categoryIndex} onChange={props.onchange} value={props.categoryName} />
        </label>
        <label>
          Weight
          <input type="number" name="weight" id={props.categoryIndex} onChange={props.onchange} value={props.categoryWeight}/>
        </label>
        <button type="submit" className="icon-button">
          {props.submitContent} <FontAwesomeIcon icon={props.submitIcon} />
        </button>
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
    editStyle: "none",
    pointsPossible: 0,
    assignmentForm: {
      name: "",
      points: 0,
      pointsPossible: 0
    },
    id: 0,
    updateGrade: null,
    validWeights: null
  };
  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      weight: props.weight,
      grade: 0,
      destroy: props.destroy,
      index: props.index,
      assignments: [],
      points: 0,
      pointsPossible: 0,
      editStyle: "none",
      editButtonStyle: "inline",
      validWeights: props.validWeights,
      assignmentForm: {
        name: "",
        points: 0,
        pointsPossible: 0
      },
      editForm:{
        name: props.name,
        weight: props.weight
      },
      updateGrade: props.updateGrade,
      id: props.id
    }
  }
  editFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.editForm.name !== "" && this.state.editForm.weight > 0 && this.state.editForm.weight < 100 && this.state.validWeights(parseInt(this.state.editForm.weight,10),this.state.id)){
      let info = {
        grade: this.state.grade,
        weight: this.state.editForm.weight,
        name: this.state.editForm.name,
        id: this.state.id
      };
      this.setState({
        name: this.state.editForm.name,
        weight: this.state.editForm.weight,
        editStyle: "none",
        editButtonStyle: "inline"
      });
      this.state.updateGrade(info);
    }
  }
  editFormChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let temp = this.state.editForm;
    temp[name] = value;
    this.setState({
      editForm: temp
    });
  }
  toggleEdit = () => {
    if (this.state.editStyle === "none"){
      this.setState({
        editStyle: "block",
        editButtonStyle: "none"
      });
    }else{
      this.setState({
        editStyle: "none",
        editButtonStyle: "inline"
      });
    }
  }
  updatePoints = (delta) => {
    let info = {
      grade: (this.state.points + delta.points) / (this.state.pointsPossible + delta.pointsPossible) * 100,
      weight: this.state.editForm.weight,
      name: this.state.editForm.name,
      id: this.state.id
    };
    this.setState((prevState) => ({
      points: prevState.points + delta.points,
      pointsPossible: prevState.pointsPossible + delta.pointsPossible,
      grade: (prevState.points + delta.points) / (prevState.pointsPossible + delta.pointsPossible) * 100
    }));
    this.state.updateGrade(info);
  }
  assignmentFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.assignmentForm.name !== "" && parseInt(this.state.assignmentForm.pointsPossible,10) > 0 && parseInt(this.state.assignmentForm.points,10) >= 0){
      let temp = this.state.assignments;
      let tempCat = <Assignment name={this.state.assignmentForm.name} points={this.state.assignmentForm.points} pointsPossible={this.state.assignmentForm.pointsPossible} updatePoints={this.updatePoints} />;
      temp.push(tempCat);
      let info = {
        grade: (this.state.points+parseInt(this.state.assignmentForm.points,10))/(this.state.pointsPossible+parseInt(this.state.assignmentForm.pointsPossible,10))*100,
        weight: this.state.weight,
        name: this.state.name,
        id: this.state.id
      };
      this.setState((prevState) => ({
        assignments: temp,
        points: prevState.points+parseInt(this.state.assignmentForm.points,10),
        pointsPossible: prevState.pointsPossible+parseInt(this.state.assignmentForm.pointsPossible,10),
        grade: (prevState.points+parseInt(this.state.assignmentForm.points,10))/(prevState.pointsPossible+parseInt(this.state.assignmentForm.pointsPossible,10))*100
      }));
      this.state.updateGrade(info);
    }else{
      alert("Must Enter In a Name. Possible Points can't equal 0. Points must be equal to or greater than 0.");
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
  remove = (index) => {
    let info = {
      grade: 0,
      weight: 0,
      name: "",
      id: parseInt(this.state.id,10)
    };
    this.state.updateGrade(info);
    this.state.destroy(index);
  }
  render(){
    return(
      <div className="category">
        <h1>{this.state.name}</h1>
        <button onClick={this.toggleEdit} className="icon-button" style={{ display: this.state.editButtonStyle}}><FontAwesomeIcon icon={faEdit}/></button>
        <button onClick={this.remove} className="icon-button"><FontAwesomeIcon icon={faTrash}/></button>
        <div style={{ display: this.state.editStyle }}>
          <CategoryForm categoryName={this.state.editForm.name} categoryIndex={0} categoryWeight={this.state.editForm.weight} onchange={this.editFormChange} submit={this.editFormSubmit} submitContent={"Update"} submitIcon={faRetweet} />
        </div>
        <h3>Grade: {this.state.grade}%</h3>
        <p>Weight: {this.state.weight}%</p>
        <h1>Assigments</h1>
        <AssignmentForm submit={this.assignmentFormSubmit} onChange={this.assignmentFormChange} name={this.state.assignmentForm.name} points={this.state.assignmentForm.points} pointsPossible={this.state.assignmentForm.pointsPossible} updatePoints={this.updatePoints} submitContent={"Add"} submitIcon={faPlus} />
        <AssignmentList assignments={this.state.assignments}/>
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
      <input type="hidden" name="updatePoints" id="updatePoints" value={props.updatePoints} />
      <button type="submit" className="icon-button">
        {props.submitContent} <FontAwesomeIcon icon={props.submitIcon} />
      </button>
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
    name: "",
    editStyle: "none",
    editToggleStyle: "inline",
    editForm: {
      name: "",
      points: 0,
      pointsPossible: 0
    },
    updatePoints: null
  }
  constructor(props){
    super(props);
    this.state = {
      points: props.points,
      pointsPossible: props.pointsPossible,
      name: props.name,
      editForm: {
        points: props.points,
        pointsPossible: props.pointsPossible,
        name: props.name
      },
      editStyle: "none",
      editToggleStyle: "inline",
      updatePoints: props.updatePoints
    };
  }
  toggleEdit = () => {
    if (this.state.editStyle === "none"){
      this.setState({
        editStyle: "block",
        editToggleStyle: "none"
      });
    }else{
      this.setState({
        editStyle: "none",
        editToggleStyle: "inline"
      });
    }
  };
  submit = (event) => {
    event.preventDefault();
    if(this.state.editForm.name !== "" && parseInt(this.state.editForm.pointsPossible,10) > 0 && parseInt(this.state.editForm.points,10) >= 0){
      let delta = {
        points: parseInt(this.state.editForm.points, 10) - this.state.points,
        pointsPossible: parseInt(this.state.editForm.pointsPossible, 10) - this.state.pointsPossible
      };
      this.setState((prevState) => ({
        name: this.state.editForm.name,
        points: parseInt(this.state.editForm.points,10),
        pointsPossible: parseInt(this.state.editForm.pointsPossible,10),
        grade: parseInt(this.state.editForm.points,10)/parseInt(this.state.editForm.pointsPossible,10)*100,
        editForm: prevState.editForm,
        editStyle: "none",
        editToggleStyle: "inline"
      }));
      this.state.updatePoints(delta);
    }else{
      alert("Must Enter In a Name. Possible Points can't equal 0. Points must be equal to or greater than 0.");
    }
  };
  onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let temp = this.state.editForm;
    temp[name] = value;
    this.setState({
      editForm: temp
    });
  };
  render(){
    return(
      <div>
        <h5>{this.state.name}</h5>
        <p>{this.state.points}/{this.state.pointsPossible} - {this.state.points/this.state.pointsPossible*100}% <button className="icon-button-small" style={{display: this.state.editToggleStyle}} onClick={this.toggleEdit}><FontAwesomeIcon icon={faEdit} /></button></p>
        <div style={{display: this.state.editStyle}}>
          <AssignmentForm submit={this.submit} onChange={this.onChange} name={this.state.editForm.name}  points={this.state.editForm.points} pointsPossible={this.state.editForm.pointsPossible} submitContent={"Update"} submitIcon={faRetweet} />
        </div>
      </div>
    );
  }
};
const Footer = (props) => {
  return(
    <div className="footer">
      <div className="footer-left">
        <p>Made by {props.contributor}</p>
        <a href={props.portfolio}>View More Of My Projects</a>
        <a href="https://github.com/prettygoodstudios/Grade-Calculator" style={{margin: "16px 0px 0px 0px", display: "block"}}>Contribute On Github</a>
      </div>
      <div className="footer-right">
        <h1><FontAwesomeIcon icon={faBook} /> {props.title}</h1>
      </div>
    </div>
  );
};
class App extends Component {
  componentDidMount = () => {
    document.title = "Grade Calculator";

  }
  render() {
    return (
      <div className="App">
        <head>
          <title>Grade Calculator</title>
        </head>
        <div className="App-header">
          <h1 className="App-title"><FontAwesomeIcon icon={faBook} /> Grade Calculator</h1>
        </div>
        <Grade />
        <Footer contributor={"Miguel Rust"} portfolio={"http://miguelrust.herokuapp.com/"} title={"Grade Calculator"}/>
      </div>
    );
  }
}

export default App;
