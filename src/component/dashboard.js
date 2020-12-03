import React from 'react';
import './style.css';
import { Card , Container, Button , Col,Row } from 'react-bootstrap';
import classNames from 'classnames'

let todoItems = [];
todoItems.push({index: 1, title: "TITLE-1", desc:'DESCRIPTION-1', done: false});
todoItems.push({index: 2, title: "TITLE-2", desc:'DESCRIPTION-2', done: true});
todoItems.push({index: 3, title: "TITLE-3", desc:'DESCRIPTION-3', done: true});

class TodoList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <Container className='listConatiner'>
        {items}
      </Container>
    );
  }
}
  
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    const todoClass = this.props.item.done ? 
        "done" : "undone";

        const completedStyle = this.props.item.done ? 'completedTitle' : 'activeTitle'
    return(
      <Card className={classNames('individualCard',todoClass)}>
        <Card.Title>
          <Row style={{display:'flex'}}>
         <Col style={{width:'10%'}} className={completedStyle}> 
         <Button onClick={this.onClickDone}>
           {todoClass =="done" ? 'Completed' : 'Active'}
           </Button> 
           </Col>
         <Col className='titleStyle'> 
          {this.props.item.title}
          </Col>
         <Col style={{width:'10%'}}> <Button type="button" className="cardCloseBtn" onClick={this.onClickClose}>&times;</Button> </Col>
          </Row>
          </Card.Title>
          <Card.Body className={classNames(completedStyle,'cardBodyStyle')}>
              {this.props.item.desc}
          </Card.Body>
      </Card>     
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentDidMount() {
  //   this.refs.itemName.focus();
  // }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = {
      title:this.refs.itemName.value,
      desc:this.refs.itemDesc.value
    }
    
    if(newItemValue.title && newItemValue.desc) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <Row style={{width:'95%'}}>
       <Col> <input type="text" ref="itemName" className="form-control" placeholder="Title"/></Col>
       <Col> <textarea type="text" ref="itemDesc" className="form-control-desc" placeholder="Description"/></Col>
       <Col><button type="submit" className={classNames("btn btn-default",'createBtnStyle')}>Create</button> </Col>
        </Row>
      </form>
    );   
  }
}
  
class TodoHeader extends React.Component {
  render () {
    return <h1>Todo list</h1>;
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems};
  }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length+1, 
      title: todoItem.newItemValue.title,
      desc:  todoItem.newItemValue.desc,
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});  
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoForm addItem={this.addItem} />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        
      </div>
    );
  }
}

 class Dashboard extends React.Component {
  render () {
    return (
      <TodoApp initItems={todoItems}/>
    );
  }
}

export default Dashboard;
