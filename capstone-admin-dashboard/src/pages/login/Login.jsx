import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { login } from "../../redux/apiCalls"

import { mobile } from "../../Responsive/responsive"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: black;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #000000;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`
// const Error = styled.span`
//   color: red;
// `
const Login = () => {
  console.log("wyooooooooooooooooooo")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const dispatch = useDispatch()
  //   const { isFetching, error } = useSelector((state) => state.user)
  const handleLogin = (e) => {
    e.preventDefault()
    login(dispatch, { email, password })
    // setAdmin(true)
    // navigate("/")
  }
  return (
    <Container>
      <Wrapper>
        <Title>ADMIN DASHBOARD</Title>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>LOGIN</Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}

          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
