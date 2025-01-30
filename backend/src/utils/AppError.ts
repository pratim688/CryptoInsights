
import AppErrorCode from "../constant/AppErrorCode";
import { HttpStatusCode } from "../constant/http";

class AppError extends Error {
    constructor(
        public statusCode: HttpStatusCode,
        public message: string,
        public errorCode?: AppErrorCode
    ) {
        super(message);
    }
}

// new AppError

export default AppError;
