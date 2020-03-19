import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {getTasksFromList, updateTasksFromList} from "../utils/TaskUtils";
import '../styles/Edit.scss';

interface EditState {
    tasks: string[];
}

class Edit extends React.Component<{}, EditState> {
    state = {
        tasks: []
    };

    componentDidMount(): void {
        this.loadTasks();
    }

    loadTasks = () => {
        const {match} = this.props as any;
        let tasks = getTasksFromList(match.params.name);
        this.setState({...this.state, tasks: tasks});
    };

    addNewTask = (e: any) => {
        const {match} = this.props as any;
        e.preventDefault();
        const tasks = this.state.tasks;
        const newTasks: string[] = [];
        tasks.forEach(t => newTasks.push(t));

        let text = e.target.taskText.value as string;
        newTasks.push(text);

        updateTasksFromList(match.params.name, newTasks);
        this.loadTasks();
    };

    deleteTaskByIndex = (index: number) => {
        const {match} = this.props as any;
        const {tasks} = this.state;
        const newTasks = tasks.filter((_, i) => i !== index);
        this.setState({...this.state, tasks: newTasks});
        updateTasksFromList(match.params.name, newTasks);
    };

    renderAddTask() {
        return (
            <Form onSubmit={this.addNewTask}>
                <Form.Group controlId="list-name">
                    <Form.Label>Task</Form.Label>
                    <Form.Control name="taskText" type="text" placeholder="Task text" required />
                    <Form.Text className="text-muted">
                        Enter any task text whatever you want.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        )
    }

    renderTasks() {
        const {tasks} = this.state;

        return (
            <div>
                {tasks.map((item: string, index) => {
                    return (
                        <Card body key={index}>
                            <Card.Title>{item}</Card.Title>
                            <Card.Link href={`/#`} onClick={() => this.deleteTaskByIndex(index)}>Delete</Card.Link>
                        </Card>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        <h1>Edit tasks</h1>
                        {this.renderAddTask()}
                        <hr />
                        <h3>Existing tasks:</h3>
                        <br />
                        {this.renderTasks()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Edit;