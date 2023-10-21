import { Box, Button } from "@mantine/core"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const BerandaAdmin = () => {
  const navigate = useNavigate()

  return (
    <Box
      className={`style-box `}
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem"
      }}
    >
      <Button onClick={async () => {
        axios.get("http://localhost:3000/secure", {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMSIsImlhdCI6MTY5NzgwMzE3NH0.C2W4DBJPkQ5Zyd5zr3AFyG9ZPy4IsDqL646B_F8vhFo",
          },
        })
          .then(res => {
            console.log("SUCCES")
            console.log(res)
          })
          .catch(err => {
            console.log("FAILEDDD")
            console.log(err)
          })

      }}
      >
        Fetch NOde Now!!
      </Button>

      <Button onClick={async () => {
        axios.get("http://localhost:8080/api/v1/admin/alur-ppdb/index?userId=1", {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5Nzc5ODA1MiwiZXhwIjoxNjk3ODg0NDUyfQ.g4oahdgP8hQdEdEU_HNBTFXtqTOISANSZPcSMdaTIqA",
          },
        })
          .then(res => {
            console.log("SUCCES")
            console.log(res)
          })
          .catch(err => {
            console.log("FAILEDDD")
            console.log(err)
          })

      }}
      >
        Fetch Spring Now!!
      </Button>

      <h1
        style={{ textAlign: "center" }}
      >
        SELAMAT DATANG ADMIN PPDB <br /> SMK TINTA EMAS INDONESIA
      </h1>

      <button onClick={() => navigate("/ppdb/siswa")}>
        siswa
      </button>
    </Box>
  )
}

export default BerandaAdmin