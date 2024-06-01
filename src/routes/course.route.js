import {Router} from 'express';
import {
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourse,
    updateCourse,
} from '../controllers/course.controller.js';

const router = Router();

router.route('/create-course').post(createCourse);

router.route('/delete-course/:id').delete(deleteCourse);

router.route('/get-all-courses').get(getAllCourses);

router.route('/get-course/:id').get(getCourse);

router.route('/update-course/:id').put(updateCourse);

export default router;