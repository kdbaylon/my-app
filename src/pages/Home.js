import { React,useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const usenavigate = useNavigate();
    const [territories, territoriesupdate] = useState('');
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }

        fetch("https://cors-anywhere.herokuapp.com/https://netzwelt-devtest.azurewebsites.net/Territories/All", {
            method:'GET'
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp.data);
            territoriesupdate(resp.data);
        }).catch((err) => {
            console.log(err.messsage)
        });

    }, []);
    


function list_to_tree(list) {
    let map = {}, node, roots = [], i;
    
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent !== null) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parent]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
}

  console.log( 'initial', territories );
  let sorted_territories = list_to_tree(territories) ;
  console.log('sorted',sorted_territories);
  
  const App = () => (
    <form>
      <Tree data={sorted_territories} />
    </form>
  );
  
  const Tree = ({data}) => ( 
    <ul>
      {data && data.map(item => (
        <li>
          {item.name}
          {item.children && <Tree data={item.children} />}
        </li>
      ))}
    </ul>
  );

    return (
        <div>
        <div className="header">
            <Link to={'/'}>Home</Link>
            <Link style={{ float: 'right' }} to={'/login'}>Logout</Link>
        </div>
        <h1 className="text-center">Territories</h1>
        <h5 className="text-center">Here are the list of territories</h5>
        <App/>

      </div>
    );
  
    
}

export default Home;