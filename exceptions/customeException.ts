import httpExcepetion from './httpException';

class customException extends httpExcepetion {
  constructor(message: string) {
    super(403, message); // 403 Forbidden
  }
}

export default customException;