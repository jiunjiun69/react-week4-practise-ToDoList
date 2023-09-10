import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_USER_API } = import.meta.env;

const TodoList = () => {
  const [nickname, setNickName] = useState('');
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [notFinish, setNotFinish] = useState(0);
  const [tabStatus, setTabStatus] = useState('all');
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const notFinishItem = todos.filter((i) => i.status === false);
    setNotFinish(notFinishItem.length);
  }, [todos]);

  useEffect(() => {
    if (tabStatus === 'all') {
      setFilterTodos(todos);
    } else if (tabStatus === 'notFinish') {
      const notFinish = todos.filter((i) => i.status === false);
      setFilterTodos(notFinish);
    } else if (tabStatus === 'finish') {
      const finish = todos.filter((i) => i.status === true);
      setFilterTodos(finish);
    }
  }, [tabStatus, todos]);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${VITE_USER_API}/users/checkout`, {
        headers: {
          Authorization: token,
        },
      });
      setNickName(res.data.nickname);
      getTodos();
    } catch (error) {
      Swal.fire('驗證失敗', '請重新登入').then(() => {
        navigate('/');
      });
    }
  };

  const getTodos = async () => {
    try {
      const res = await axios.get(`${VITE_USER_API}/todos`, {
        headers: {
          Authorization: token,
        },
      });
      setTodos(res.data.data);
    } catch (error) {
      Swal.fire('失敗', error.response.data.message);
    }
  };

  const addTodo = async () => {
    if (!newTodo) {
      Swal.fire('新增失敗', '請輸入代辦');
      return;
    }
    try {
      const res = await axios.post(
        `${VITE_USER_API}/todos`,
        {
          content: newTodo,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setNewTodo('');
      getTodos();
      setTabStatus('all');
    } catch (error) {
      Swal.fire('失敗', error.response.data.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const finishTodo = async (id) => {
    try {
      const res = await axios.patch(
        `${VITE_USER_API}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getTodos();
    } catch (error) {
      Swal.fire('失敗', error.response.data.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${VITE_USER_API}/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      getTodos();
    } catch (error) {
      Swal.fire('失敗', error.response.data.message);
    }
  };

  const clearFinishItem = async () => {
    todos.filter((i) => {
      if (i.status) {
        deleteTodo(i.id);
      }
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '確定要登出待辦嗎',
      showDenyButton: true,
      confirmButtonText: '確定',
      denyButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '已登出',
          showConfirmButton: false,
          timer: 500,
        });
        navigate('/');
        document.cookie = `token=; SameSite=None; Secure`;
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <span>{nickname}的待辦</span>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              登出
            </a>
          </li>
        </ul>
      </nav>
      <div className="container todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input
              type="text"
              placeholder="請輸入待辦事項"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value.trim())}
              onKeyDown={handleKeyDown}
            />
            <a
              href="#"
              className="p-0"
              onClick={(e) => {
                e.preventDefault();
                addTodo();
              }}
            >
              <img src="/react-week4-practise-ToDoList/plus.png" alt="plus" />
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li>
                <a
                  href="#"
                  className={tabStatus === 'all' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setTabStatus('all');
                  }}
                >
                  全部
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={tabStatus === 'notFinish' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setTabStatus('notFinish');
                  }}
                >
                  待完成
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={tabStatus === 'finish' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setTabStatus('finish');
                  }}
                >
                  已完成
                </a>
              </li>
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                {filterTodos.length === 0 ? (
                  <li
                    className="todoList_label"
                    style={{ justifyContent: 'space-around', cursor: 'auto' }}
                  >
                    目前尚無項目
                  </li>
                ) : (
                  ''
                )}
                {filterTodos.map((todo) => {
                  return (
                    <li key={todo.id}>
                      <label className="todoList_label">
                        <input
                          className="todoList_input"
                          type="checkbox"
                          checked={todo.status}
                          onChange={() => finishTodo(todo.id)}
                        />
                        <span>{todo.content}</span>
                      </label>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteTodo(todo.id);
                        }}
                      >
                        <img src="/react-week4-practise-ToDoList/delete.jpg" alt="delete" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="todoList_statistics">
                <p> {notFinish}個待完成項目</p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    clearFinishItem();
                  }}
                >
                  清除已完成項目
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;