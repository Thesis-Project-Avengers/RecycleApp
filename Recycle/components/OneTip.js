import { View, Text, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import React from 'react'

const OneTip = () => {
    return (
        <View style={{marginBottom:20,borderWidth: 2, borderColor: "#eee", borderRadius: 20, height: 350, width: "100%", gap: 10, flexDirection: 'column', pa: 20 }} >
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Image borderRadius={50} source={{ uri: "https://imgs.search.brave.com/GTJCGfegRVtsmO_8q1JhKHaKmJ6Fh3hcEwzK6m3klog/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zcC1h/by5zaG9ydHBpeGVs/LmFpL2NsaWVudC90/b193ZWJwLHFfZ2xv/c3N5LHJldF9pbWcs/d18zMDAsaF8zMDAv/aHR0cHM6Ly9ibG9n/LnNuYXBwYS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDgvZG90dGVkLWJh/Y2tncm91bmQtYXZh/dGFyLWV4YW1wbGUt/MzAweDMwMC5qcGc" }} width={50} height={50} />
                    <Text style={{ fontSize: 16, fontWeight: 900 }}>Flen</Text>
                </View>
                <Text>1 min</Text>
            </View>
            <Image style={{ objectFit: "contain", width: "100%", height: "60%" }} borderRadius={50} source={{ uri: "https://imgs.search.brave.com/GTJCGfegRVtsmO_8q1JhKHaKmJ6Fh3hcEwzK6m3klog/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zcC1h/by5zaG9ydHBpeGVs/LmFpL2NsaWVudC90/b193ZWJwLHFfZ2xv/c3N5LHJldF9pbWcs/d18zMDAsaF8zMDAv/aHR0cHM6Ly9ibG9n/LnNuYXBwYS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDgvZG90dGVkLWJh/Y2tncm91bmQtYXZh/dGFyLWV4YW1wbGUt/MzAweDMwMC5qcGc" }} />
            <Text>Post context bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</Text>
            <View style={{ flexDirection: "row", gap: 50 }}>
                <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
                    <Icon
                        size={20}
                        name="heart-o"
                    />
                    <Text style={{ fontWeight: 700 }}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
                    <Icon
                        size={20}
                        name="comment-o"
                    />
                    <Text style={{ fontWeight: 700 }}>Comment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OneTip