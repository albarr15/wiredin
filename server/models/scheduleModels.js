import { pool } from "../config/db.js";

export const Schedule = {
  get: async (place_id) => {
    const result = await pool.query(
      ` SELECT sd.*
      FROM schedule_days sd
      JOIN schedules s ON sd.schedule_id = s.id
      WHERE s.place_id = $1
      ORDER BY sd.day_of_week;`,
      [place_id],
    );

    return result.rows;
  },

  create: async (properties) => {
    const { place_id, days } = properties;

    if (!place_id) {
      throw new Error("place_id is required");
    }

    if (!days || Object.keys(days).length === 0) {
      throw new Error("At least one schedule day is required");
    }

    const daysOfTheWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const providedDays = Object.keys(days);

    // Validate day names
    const invalidDays = providedDays.filter(
      (day) => !daysOfTheWeek.includes(day),
    );

    if (invalidDays.length > 0) {
      throw new Error(`Invalid day(s): ${invalidDays.join(", ")}`);
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Create the schedule for the place
      const scheduleResult = await client.query(
        `
        INSERT INTO schedules (place_id)
        VALUES ($1)
        RETURNING id;
      `,
        [place_id],
      );

      const schedule_id = scheduleResult.rows[0].id;

      const resultRows = [];

      // Create schedule days
      for (const day of daysOfTheWeek) {
        const scheduleDay = days[day.toLowerCase()];

        const result = await client.query(
          `
          INSERT INTO schedule_days (
            schedule_id,
            day_of_week,
            opening_time,
            closing_time
          )
          VALUES ($1, $2, $3, $4)
          RETURNING *;
          `,
          [
            schedule_id,
            day.toUpperCase(),
            scheduleDay?.opening_time ?? null,
            scheduleDay?.closing_time ?? null,
          ],
        );

        resultRows.push(result.rows[0]);
      }

      await client.query("COMMIT");

      return resultRows;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  update: async (place_id, properties) => {
    const { days } = properties;

    if (!place_id) {
      throw new Error("place_id is required");
    }

    if (!days || Object.keys(days).length === 0) {
      throw new Error("At least one schedule day is required");
    }

    const daysOfTheWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const providedDays = Object.keys(days);

    // Validate day names
    const invalidDays = providedDays.filter(
      (day) => !daysOfTheWeek.includes(day),
    );

    if (invalidDays.length > 0) {
      throw new Error(`Invalid day(s): ${invalidDays.join(", ")}`);
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Find the existing schedule
      const scheduleResult = await client.query(
        `
      SELECT id
      FROM schedules
      WHERE place_id = $1;
    `,
        [place_id],
      );

      const schedule_id = scheduleResult.rows[0].id;

      if (!schedule_id) {
        throw new Error(`Schedule with id ${place_id} not found.`);
      }

      const resultRows = [];

      // Update or create schedule days
      for (const day of providedDays) {
        const { opening_time, closing_time } = days[day];

        const result = await client.query(
          `
        UPDATE schedule_days
        SET
          opening_time = $1,
          closing_time = $2
        WHERE schedule_id = $3
          AND day_of_week = $4
        RETURNING *;
      `,
          [opening_time, closing_time, schedule_id, day.toUpperCase()],
        );

        resultRows.push(result.rows[0]);
      }

      await client.query("COMMIT");

      return resultRows;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  delete: async (place_id) => {
    const result = await pool.query(
      `
        DELETE FROM schedules
        WHERE place_id = $1
        RETURNING *;
        `,
      [place_id],
    );

    return result.rows[0];
  },
};
