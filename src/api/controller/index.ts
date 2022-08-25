import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserInstance } from "../model";

class UserController {
	async create(req: Request, res: Response) {
		const id = uuidv4();
		
		try {
			const data = await UserInstance.create({ ...req.body, id });
			return res.json({ data, msg: "Successfully created", status: 200 });
		} catch (e) {
			console.log(e)
			return res.json({ msg: "failed to create", status: 500, route: "/create" });
		}
	}

	async users(req: Request, res: Response) {
		try {
			const limit = (req.query.limit as number | undefined) || 10;
			console.log(limit)
			const offset = req.query.offset as number | undefined;
			const data = await UserInstance.findAll({ where: {}, limit, offset });
			return res.json({data, status: 200, msg: "Data found"});
		} catch (e) {
			return res.json({ msg: "failed to read", status: 500, route: "/read" });
		}
	}

	async userByID(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await UserInstance.findOne({ where: { id } });
			return res.json({record, msg: "Data found", status: 200});
		} catch (e) {
			return res.json({ msg: "failed to read", status: 500, route: "/read/:id" });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await UserInstance.findOne({ where: { id } });

			if (!record) {
				return res.json({ msg: "Cannot find existing record", status: 200, data: [] });
			}

			const updatedRecord = await record.update({
				email: record.getDataValue("email"),
			});

			return res.json({ data: updatedRecord, status: 200, msg: "Updated Successfully"});
		} catch (e) {
			return res.json({
				msg: "failed to read",
				status: 500,
				route: "/update/:id",
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await UserInstance.findOne({ where: { id } });

			if (!record) {
				return res.json({ msg: "Can not find existing record", status: 200, data: [] });
			}

			const deletedRecord = await record.destroy();
			return res.json({ data: deletedRecord, status: 200, msg: "Deleted Successfully" });
		} catch (e) {
			return res.json({
				msg: "fail to read",
				status: 500,
				route: "/delete/:id",
			});
		}
	}
}

export default new UserController();
