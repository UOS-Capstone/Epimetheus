package uos.capstone.epimetheus.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
public class LlamaStepResponse {
        private List<Choice> choices;

        public StringBuilder parseContent() {
                try {
                        return choices.get(0).getDelta().getContent();
                } catch (NullPointerException e) {
                        return new StringBuilder();
                }
        }

        public static LlamaStepResponse eof() {
                LlamaStepResponse response = new LlamaStepResponse();
                response.choices = new ArrayList<>();
                response.choices.add(new Choice("[DONE]"));

                return response;
        }
}
@Getter
@NoArgsConstructor
class Choice {
        private Delta delta;

        Choice(String content) {
                this.delta = new Delta(content);
        }

}
@Getter
@NoArgsConstructor
class Delta {
        private StringBuilder content = new StringBuilder();

        Delta(String content) {
                this.content.append(content);
        }
}
