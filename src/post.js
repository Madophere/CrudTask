import React, { Component } from "react";
import axios from "axios";
import {Table,Button} from "react-bootstrap";


class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            id:"",
            name: "",
            username: "",
            email:"",
            phone: "",
            website: ""
            
            
            
        }
    }

    componentDidMount = () => this.getUsers();

    // componentDidMount = () => this.getUser();

    createUser = async () => {
        try {
            const { data } = await axios.post("https://jsonplaceholder.typicode.com/users",
                {
                    name: this.state.name,
                    username: this.state.username,
                    email: this.state.email,
                    phone: this.state.phone,
                    website: this.state.website
                });
            const users = [...this.state.users];
            users.push(data);
            this.setState({
                users: users, 
                
                name: "",
                username: "",
                email: "",
                phone:"",
                website:""
            });

        } catch (e) {
            console.log(e);
        }
    }

    getUsers = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            this.setState({ users: response.data });
        } catch (err) {
            console.error(err);
        }
    }

    deleteUser = async (userId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
            let users = [...this.state.users];
            users = users.filter((user) => user.id !== userId);
            this.setState({ users });
        } catch (error) {
            console.log(error);
        }

    }
    selectUser = (user) => {
             this.setState({
                 name:user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                website: user.website
             })
    }
    updateUser = async () => {
        // API Call to server and update an existing post
        try {
          const { id ,name, username, email, phone, website,users } = this.state;
          const { data } = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
            name,
            username,
            email,
            phone,
            website
          });
          const index = users.findIndex((user) => user.id === id);
          users[index] = data;
    
          this.setState({ users, name: "", username: "", email: "", phone: "", website: "" });
        } catch (err) {
          console.log(err);
        }
      };

  
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.id){
            this.updateUser();
        }else{
        this.createUser();
        }

    }


    render() {
        return (
            <>
            <div className="formdec">
                <form onSubmit={this.handleSubmit}>
                    <div>Name</div>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    <div>UserName</div>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <div>Email</div>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <div>Phone</div>
                    <input type="number" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    <div>Website</div>
                    <input type="url" name="website" value={this.state.website} onChange={this.handleChange} />
                    <div><input type="Submit" /></div>
                </form>
                </div>
                <Table striped bordered hover variant="light-dark" >
                    <tr>
                        <th>ID</th>
                    <th>Name</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Action</th>
                    </tr>
                    <tbody>
                        {this.state.users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.website}</td>
                                    <td>
                                    <Button onClick={() => this.selectUser(user)}>Edit</Button>
                                    <Button variant="danger" onClick={() => this.deleteUser(user.id)}>Delete</Button>
                                   
                                    </td>
                                </tr>
                                
                                
                            );
                        })}
                    </tbody>
                    
                </Table>
            
                
            </>
        );
    }
}
export default Users;