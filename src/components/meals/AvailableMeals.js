import classes from './AvailableMeals.module.css'
import Card from "../common/Card";
import MealItem from "./MealItem";
import {useEffect, useState} from "react";
import useHttp from "../../hooks/use_http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const {isLoading, error, sendRequest: fetchMeals} = useHttp()

  useEffect(() => {
    const transformMeals = (meal) => {
      const loadedMeals = [];
      for (const taskKey in meal) {
        loadedMeals.push({
          id: taskKey,
          name: meal[taskKey].name,
          description: meal[taskKey].description,
          price: meal[taskKey].price,
        });
      }
      setMeals(loadedMeals);
    }

    fetchMeals({
      url: 'https://react-http-demo-cf6f3-default-rtdb.firebaseio.com/meals.json',
    }, transformMeals);
  }, [fetchMeals])

  let content;
  if (error) {
    content = <button onClick={fetchMeals}>Try again</button>;
  } else if (isLoading) {
    content = 'Loading tasks...';
  } else {
    content = <ul>
      {meals.map(meal =>
        <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)}
    </ul>
  }

  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  )
}

export default AvailableMeals