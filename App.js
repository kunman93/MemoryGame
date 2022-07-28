import MemoryGame from './components/MemoryGame'
import * as Font from 'expo-font'
import { useFonts } from 'expo-font';


export default function App() {
  const [loadedFont] = useFonts({
      'IndieFlower-Regular': require('./assets/fonts/IndieFlower-Regular.ttf'),
    });
  
  if(!loadedFont){
    return null;
  }

  return (
    <MemoryGame />
  );
}

