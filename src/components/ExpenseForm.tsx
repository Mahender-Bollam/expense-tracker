import React, { FC, useState } from "react";
import { Expense } from "../types";

type Props = {
  onAdd: (expense: Expense) => void;
  nextId: number;
};