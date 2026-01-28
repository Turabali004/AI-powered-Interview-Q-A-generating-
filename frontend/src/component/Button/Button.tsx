
interface ButtonProps {
  count: number
  increment: () => void
}
const Button = ({count, increment}:ButtonProps) => {
  

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </>
  )
}

export default Button