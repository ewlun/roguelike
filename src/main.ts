import { Field } from "./components/index.js";

let field = new Field(50, 15);

field.content[39][3] = "@"

field.drawField();