<template>
	<div class="categoryInputBlock">
		<input
			class="categorySelect"
			type="text"
			:value="test"
			readonly
			@click="showModal"
		/>
	</div>

	<div>
		<Teleport
			v-if="test"
			to="body"
		>
			<div
				class="modal fade"
				ref="categoryInputModalRef"
				tabindex="-1"
				data-bs-keyboard="false"
				role="dialog"
				aria-labelledby="modalTitleId"
				aria-hidden="true"
			>
				<div
					class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
					role="document"
				>
					<div class="modal-content">
						<div class="modal-header">
							<h5
								class="modal-title"
								id="modalTitleId"
							>
								請選取商品類別
							</h5>
						</div>
						<div class="modal-body">
							<div class="select-block d-flex flex-row">
								<div class="options-block">
									<div class="list-group m-1">
										<button
											type="button"
											class="list-group-item list-group-item-action active"
											aria-current="true"
										>
											The current button
										</button>
										<button
											type="button"
											class="list-group-item list-group-item-action"
										>
											A second button item
										</button>
										<button
											type="button"
											class="list-group-item list-group-item-action"
										>
											A third button item
										</button>
										<button
											type="button"
											class="list-group-item list-group-item-action"
										>
											A fourth button item
										</button>
										<button
											type="button"
											class="list-group-item list-group-item-action"
											disabled
										>
											A disabled button item
										</button>
									</div>
								</div>
								<div class="options-block">
									<div class="list-group m-1">
										<button
											type="button"
											class="list-group-item list-group-item-action active"
											aria-current="true"
										>
											The current button
										</button>
										<button
											type="button"
											class="list-group-item list-group-item-action"
										>
											A second button item
										</button>
										<button
											type="button"
											class="list-group-item list-group-item-action"
										>
											A third button item
										</button>
										<button
											type="button"
											class="list-group-item list-group-item-action"
										>
											A fourth button item
										</button>
										<button
											type="button"
											class="list-group-item list-group-item-action"
											disabled
										>
											A disabled button item
										</button>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-secondary"
								@click="hideModal"
							>
								取消
							</button>
							<button
								type="button"
								class="btn btn-primary"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>
<script setup>
import { ref, nextTick } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.min.js';

const categoryInputModalRef = ref(null);
const categoryInputModal = ref(null);
const test = ref(false);

const showModal = () => {
	test.value = !test.value;
	nextTick(() => {
		const options = {
			backdrop: 'static',
		};
		categoryInputModal.value = new Modal(categoryInputModalRef.value, options);
		categoryInputModal.value.show();
	});
};
const hideModal = () => {
	categoryInputModal.value.hide();
	test.value = !test.value;
};
</script>
<style scoped>
.categoryInputBlock {
	position: relative;
	width: 100%;
}

.categorySelect {
	position: relative;
	margin: 3px;
	width: 100%;
}

.options-block {
	/* margin: 1rem; */
	width: 50%;
	/* flex: 1 1 auto; */
}
</style>
