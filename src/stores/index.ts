
import { counters } from "./modules/counter";

export default function useStore() {
  return {
    counters: counters(),
  }
}
