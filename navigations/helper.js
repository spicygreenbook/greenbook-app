import React from "react";
import { ScrollView } from "react-native";

export const WithScrollView = (Component) => () => <ScrollView><Component /></ScrollView>