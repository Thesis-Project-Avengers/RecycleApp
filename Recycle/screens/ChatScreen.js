import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBullet from "../components/ChatBullet";
import ChatRow from "../components/ChatRow";
const ChatScreen = () => {
  return (
    <View style={{ padding: 10, gap: 25, backgroundColor: "white" }}>
      <ChatHeader />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chatBullet}
      >
        <ChatBullet image="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/347253762_632332375434169_2230005292919228659_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kq-7lFGMHY8AX_Vvp9L&_nc_ht=scontent.ftun9-1.fna&oh=00_AfD61NRsgJU3pfxXDGKzJoC0IGJIcoaQHLZNc-FmkR6rBw&oe=6545A321" />
        <ChatBullet image="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/347389791_1387274348784480_3857632196740571851_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GKf2L2RZOoAAX-lN1o3&_nc_ht=scontent.ftun9-1.fna&oh=00_AfCnMH5NPnpcs6hFJj99lWQkDnpkQhG43zG8PB66DiGPWQ&oe=6545B393" />
        <ChatBullet image="https://scontent.ftun9-1.fna.fbcdn.net/v/t1.6435-1/106737994_1336993673160276_533858732439424999_n.jpg?stp=dst-jpg_p320x320&_nc_cat=100&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=CqsvkCJSLoUAX9pMU9d&_nc_ht=scontent.ftun9-1.fna&oh=00_AfCtvtvHzGrBE7USZnzfr3D9o1WEd9o8Pb775z5190zJMg&oe=656791D3" />
        <ChatBullet image="https://scontent.ftun9-1.fna.fbcdn.net/v/t1.6435-9/117819560_2661299077469617_4702109921898009994_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=be3454&_nc_ohc=NVXqH3bdGdEAX93wn09&_nc_ht=scontent.ftun9-1.fna&oh=00_AfCZ2FfSV-Y-u8SQaE1tPWMYvSAMPcY1AF3RyjuUOdAOrA&oe=6567978C" />
        <ChatBullet image="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/292294810_1093193028298518_8936023195463806182_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-hjlA_8N0TAAX9OkGdi&_nc_oc=AQlWgMCsZtr04ZHiZwKF6YoBKqNiTglW1WEXfL3rjFNho9E8Gbqh3tgYUbmgZaHKe2g&_nc_ht=scontent.ftun9-1.fna&oh=00_AfD48MhGWcnm-V1Rz5I9JjASJtgAZ1uPdL3QKWPshYirJA&oe=6544DCA8" />
      </ScrollView>
      <ScrollView style={{ height: "67%" }}>
        <ChatRow />
        <ChatRow />
        <ChatRow />
        <ChatRow />
        <ChatRow />
        <ChatRow />
        <ChatRow />
        <ChatRow />
        <ChatRow />
        <ChatRow />
        <ChatRow />
      </ScrollView>
    </View>
  );
};
export default ChatScreen;

const styles = StyleSheet.create({
  oneImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  chatBullet: {
    height: 110,
    gap: 10,
  },
});
