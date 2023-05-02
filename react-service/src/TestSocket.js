import React, { useState } from 'react';
import io from 'socket.io-client';
import { useRef } from 'react';
import { useEffect } from 'react';

function TestSocket() {
  const socketRef = useRef();
  const [data, setData] = useState("");
  const [message, setMessage] = useState([]);
  const [channel, setChannel] = useState("1");

  // 当channel发生变化后触发，链接到socket server，并加入当前频道
  useEffect(() => {

    socketRef.current = io('http://localhost:3001');
    socketRef.current.emit('join', channel);

    // 组件卸载前断开socket server链接
    return () => {
      socketRef.current.disconnect();
    };
  }, [channel]);


  // 当message发生变化后触发，向socket发送消息
  useEffect(() => {
    socketRef.current.on('message', (data) => {
      console.log('The server has sent some data to all clients, data =>', data);
      console.log("current message array => ", message);
      setMessage((prevMessages) => [...prevMessages, data]);
    });


    return () => {
      socketRef.current.off('message');
      socketRef.current.off('user_join');
    };
  }, [message]);

  const handleClick = (newChannel) => {
    socketRef.current.emit('leave', channel);
    socketRef.current.emit('join', newChannel);
    setChannel(newChannel);
  }

  return (
    <div>

      <ul id="messages">
        {message && message.map((data, index) => {
          return <li key={index}>{data}</li>
        })}
      </ul>
      <form id="form" action="">
        <input id="input" onChange={(e) => {
          setData(e.target.value);
        }} /><button onClick={(e) => {
          e.preventDefault();
          socketRef.current.emit('message', data);
          console.log("Button clicked! Data => ", data);
        }}>Send</button>
      </form>

      <button onClick={() => handleClick("1")}>频道1</button>
      <button onClick={() => handleClick("2")}>频道2</button>
      <button onClick={() => handleClick("3")}>频道3</button>
    </div>
  )
}

export default TestSocket