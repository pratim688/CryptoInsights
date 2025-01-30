import { z } from 'zod';
import { BlogSchema } from './blog.validation';


const EditBlogSchema = BlogSchema.partial();

export { EditBlogSchema };