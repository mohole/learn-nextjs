// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Low, Memory } from "lowdb";
import { v4 as uuidv4 } from "uuid";
import { Excursion, Message } from "./../../../types/api";

/**
 * Create a new LowDB adapter using in-memory persistance and a schema
 */
const adapter = new Memory<Excursion[]>();

/**
 * Create a new LowDB instance with the previous adapter
 */
const db = new Low<Excursion[]>(adapter);

/**
 * Body of the API logic
 * @param req incoming data from the request
 * @param res data to output as response
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Excursion | Excursion[] | Message>
) {
  /**
   * Read the LowDB data, fallback to an empty array if we don't have any
   */
  await db.read();
  db.data ||= [
    {
      uuid: uuidv4(),
      name: "test",
      height: 2000,
      photo: "",
      timing: 180,
    },
  ];

  /**
   * Getting the UUID from the query parameters
   */
  const uuid: string =
    req.query.id && req.query.id.length > 0 ? req.query?.id[0] : "";

  /**
   * Check the request method ad act accordingly
   */

  /**
   * on GET it's just returning the data of the DB as a JSON
   */
  if (req.method === "GET") {
    res.status(200).json(db.data);
  }

  /**
   * on GET and with an UUID provided return just one item or a message if not found
   */
  if (req.method === "GET" && uuid.length > 0) {
    const getOne: Excursion[] = db.data.filter(
      (item: Excursion): boolean => item.uuid === uuid
    );
    const notFound: Message = {
      message: "The provided UUID doesn't match any activity",
    };
    res.status(200).json(getOne.length > 0 ? getOne[0] : notFound);
  }

  /**
   * on POST it gets the data from the body and add a UUID then push the new item into
   * the DB and return a message as response
   */
  if (req.method === "POST") {
    const entry: Excursion = req.body;
    entry.uuid = uuidv4();
    db.data.push(entry);
    db.write();
    res.status(200).json({ message: "new entry succesfully created" });
  }

  /**
   * on DELETE it filters out the item with the provided uuid and update the local data
   */
  if (req.method === "DELETE") {
    const remove: Excursion[] = db.data.filter(
      (e: Excursion): boolean => e.uuid !== uuid
    );
    db.data = remove;
    db.write();
    res
      .status(200)
      .json({ message: `The item with id ${uuid} has been deleted` });
  }

  /**
   * on PUT it overwrites the content of the given item with the received request body data
   */
  if (req.method === "GET") {
    const index: number = db.data.findIndex(
      (item: Excursion): boolean => item.uuid === uuid
    );
    const update: Excursion[] = [...db.data];
    update[index] = req.body;
    db.data = update;
    db.write();
    res
      .status(200)
      .json({ message: `The item with id ${uuid} has been updated` });
  }
}
