import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

let black = "#111314";
let accent = "#15d846";

const Doc = () => {
  return (
    <Document style={{fontSize:"5pt"}}>
      <Page>
        <Text style={{
            fontWeight : "bold",
            marginBottom : "1pt"
        }}> Titre du Livre </Text>

        <View>
          <Text
            style={{
              lineHeight : "2pt"
            }}
          >
            Lopt ipsum dolor sit amet consectetur adipisicing elit. Doloribus ut
            accusamus ipsum sit! In maiores facilis ducimus, officia, ipsa pt
            ullam eveniet ea quae quaerat atque eligendi, exercitationem
            tenetur? Quos. Lopt ipsum dolor sit amet consectetur adipisicing
            elit. Magni aspernatur dolores blanditiis? Sapiente, expedita? At
            nisi numquam assumenda dolopt expedita quasi impedit aut, maxime,
            rerum quia eveniet! Molestias, necessitatibus ut. Iste repudiandae
            non asperiores excepturi totam culpa saepe distinctio quasi nemo.
            Sed, tempora. Sunt consectetur magni reiciendis tempora ratione
            beatae officia quis pt quaerat blanditiis? Enim reprehenderit
            nostrum error accusantium! Cupiditate asperiores itaque ipsam earum
            ullam ab sapiente molestiae, a hic quas in, error harum magnam animi
            nulla, officiis magni accusamus quod aliquam ad! Quis omnis nesciunt
            animi deserunt eligendi. Laborum, laudantium et. Deleniti excepturi
            sint ad doloptque illo inventore maiores ea ducimus aut error animi
            possimus, architecto iure reiciendis molestias aliquid recusandae
            qui consequatur eos obcaecati commodi nihil nemo? Ut corporis eius
            accusamus obcaecati sint? Error, earum nesciunt, vel a veniam
            recusandae itaque repellendus, vero nostrum qui quasi nisi. Nemo,
            facere tempora in quis soluta reiciendis odit officia magni. Debitis
            tempora possimus exercitationem accusamus iure, beatae est. Delectus
            iste officiis labore non ab maxime numquam corrupti quaerat beatae
            aliquid assumenda autem vel, asperiores repellat necessitatibus in,
            facere accusamus nemo! Pariatur nisi dolorum accusamus ratione eos
            beatae cupiditate, ipsam dignissimos nam laudantium laboriosam
            repellat maiores omnis. Tenetur iusto dolorum molestiae quis enim
            aliquid eum suscipit minus. Doloptque error officia distinctio? Quo
            fuga asperiores deleniti quia optio reprehenderit corporis eveniet
            illo, aspernatur ex quasi ratione, dolores vero! Dolores, pariatur.
            Eos sequi officia laboriosam sint, mollitia provident inventore
            dolore omnis porro modi? Sunt aliquid illo impedit sed eum natus,
            necessitatibus facilis facere veniam doloribus expedita ab nesciunt,
            odit odio maiores commodi? Eius nesciunt perferendis laudantium quae
            autem qui sed dolore libero molestias. Minus laudantium fugiat ipsum
            id iure. Earum nobis nemo vel in iure provident delectus,
            repudiandae optio minus accusamus reiciendis nisi, labore mollitia
            laborum molestiae voluptatibus, harum sapiente ducimus rerum quidem.
          </Text>
        </View>

        <View>
          <Text style={{marginBottom: "1pt" }}>
            Créé : le 12 Septembre 2024
          </Text>
          <Text style={{marginBottom: "1pt" }}>
            Modifié : le 12 Septembre 2024
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Doc;
