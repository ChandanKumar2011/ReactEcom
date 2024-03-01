import {useEffect, useState } from "react"
import ListItems from "./ListItem/ListItems";
import axios from "axios";

const Products = () => {
  const [items, setItems] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
      async function fetchItems() {
          try {
              const response = await axios.get('https://react-project-ecommerce-1ff0a-default-rtdb.firebaseio.com/.json')
              const data = response.data
             // console.log("data", data.items);
              const transformedData = Object.keys(data).map((key) => ({
                
                id: key,
                ...data[key]

              }));
             // console.log("TransformedData", transformedData[0]);
              setItems(transformedData);   
              //setData(items[0])
              
          } 
          catch (error) {
              console.log("Error: ", error)
              alert("Some error occurred");
          }
      }
      fetchItems();
     //console.log("Items1", items);
     //setData(items[0])
  }, [])
  console.log("items2",data);
  setData(items[0])


  const updateItemTitle = async (itemId) => { 
      console.log(`Item with ID: ${itemId}`)
      try {
          let title = `Update Title #Item-${itemId}`
          await axios.patch(`https://react-project-ecommerce-1ff0a-default-rtdb.firebaseio.com/${itemId}.json`, {
              title: title
          })
          //let data = [...items]
          //let index = data.findIndex(e => e.id === itemId)
          //data[index]['title'] = title
          // Create a new array with the updated item
        let updatedItems = items.map(item => {
            if (item.id === itemId) {
                return { ...item, title: title };
            } else {
                return item;
            }
        });

        setItems(updatedItems);

          //setItems(data)
      }
      catch(error) {
          console.log("Error Updating the data!");
      }
  }

  return (
      <div className={"product-list"}>
          <div className={"product-list--wrapper"}>
              {/* <ListItem data={items[0]}></ListItem>
              <ListItem data={items[1]}></ListItem> */}
              {data&&
                data.map(item => {
                     return (<ListItems key={item.id} 
                    data={item} updateItemTitle={updateItemTitle}/>)
                  })
              }
              {/* {[<ListItem data={item[0]}/>,<ListItem data={item[1]}/>,<ListItem data={item[3]}/>]} */}
          </div>
      </div>
  )
}

export default Products;